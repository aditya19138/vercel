import { S3 } from 'aws-sdk';
import fs from 'fs';
require("dotenv").config();

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT
});

// filename => output/l23hfjkkf/src/index.ts
// filePath => /Users/username/vercel/output/l23hfjkkf/src/index.ts


// function to upload a file in s3 bucket given filePath and fileName
export const uploadFile = async (fileName: string,localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const params = {
        Bucket: "vercel",
        Key: fileName,
        Body: fileContent
    };
    await s3.upload(params, (err:any, data:any ) => {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}