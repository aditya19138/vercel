import { S3 } from 'aws-sdk';
require('dotenv').config();
import path from 'path';
import fs from 'fs';

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT,
});


export async function downloadS3Folder(prefix: string) {
    const allFiles = await s3.listObjectsV2({
        Bucket: "vercel",
        Prefix: prefix,
    }).promise();

    const allPromises = allFiles.Contents?.map(async (file: any) => {
        return new Promise(async (resolve: any) => {
            if (!file.Key) {
                resolve("");
                return;
            }
            const finalOutputPath = path.join(__dirname, file.Key);
            const finalOutputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName, { recursive: true });
            }
            s3.getObject({
                Bucket: "vercel",
                Key: file.Key,
            }).createReadStream().pipe(finalOutputFile)
                .on("finish", () => {
                    console.log(`Downloaded ${file.Key}`);
                    resolve("");
                });

        })
    }) || [];
    console.log("awaiting")

    await Promise.all(allPromises?.filter((promise) => promise !== undefined))
        .then(() => {
            console.log("All files downloaded successfully")
        })
        .catch((e) => {
            console.log("One of the file is not downloaded", e);
        });
    console.log("done")
}

function getAllFilePaths(folderPath: string): string[] {
    let filePaths: string[] = []

    const allFilesAndFolders = fs.readdirSync(folderPath)

    for (const file of allFilesAndFolders) {
        const filePath = path.join(folderPath, file)
        if (fs.statSync(filePath).isDirectory()) {
            const subDirPaths = getAllFilePaths(filePath)
            filePaths.push(...subDirPaths)
        } else {
            filePaths.push(filePath)
        }
    }
    return filePaths;
}

const uploadFile = async (fileName: string, localFilePath: string) => {
    // console.log(process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY, process.env.ENDPOINT)
    const fileContent = fs.readFileSync(localFilePath);
    const params = {
        Bucket: "vercel",
        Key: fileName,
        Body: fileContent
    };
    await s3.upload(params, (err: any, data: any) => {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}

export function copyFinalBuild(id: string) {
    const folderPath = path.join(__dirname, `output/${id}/build`);
    const allFilePaths = getAllFilePaths(folderPath);
    allFilePaths.forEach((file) => {
        const fileName = `build/${id}/` + file.slice(folderPath.length + 1).replace(/\\/g, "/")
        uploadFile(fileName, file.replace(/\\/g, "/"));
    });

}