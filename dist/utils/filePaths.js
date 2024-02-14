"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilePaths = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getAllFilePaths(folderPath) {
    let filePaths = [];
    const allFilesAndFolders = fs_1.default.readdirSync(folderPath);
    for (const file of allFilesAndFolders) {
        const filePath = path_1.default.join(folderPath, file);
        if (fs_1.default.statSync(filePath).isDirectory()) {
            const subDirPaths = getAllFilePaths(filePath);
            filePaths.push(...subDirPaths);
        }
        else {
            filePaths.push(filePath);
        }
    }
    return filePaths;
}
exports.getAllFilePaths = getAllFilePaths;
