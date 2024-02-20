"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
require("dotenv").config();
const s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT
});
// filename => output/l23hfjkkf/src/index.ts
// filePath => /Users/username/vercel/output/l23hfjkkf/src/index.ts
// function to upload a file in s3 bucket given filePath and fileName
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY, process.env.ENDPOINT)
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const params = {
        Bucket: "vercel",
        Key: fileName,
        Body: fileContent
    };
    // promise to upload file in s3 bucket
    yield s3.upload(params).promise()
        .then((data) => {
        console.log(`File uploaded successfully. ${data.Location}`);
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.uploadFile = uploadFile;
