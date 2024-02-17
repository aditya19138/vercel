import fs from "fs"
import path from "path"

export function getAllFilePaths(folderPath: string): string[] {
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