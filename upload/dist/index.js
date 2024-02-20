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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const random_1 = require("./utils/random");
const simple_git_1 = require("simple-git");
const filePaths_1 = require("./utils/filePaths");
const path_1 = __importDefault(require("path"));
const aws_1 = require("./utils/aws");
require("dotenv").config();
const redis_1 = require("redis");
const publisher = (0, redis_1.createClient)();
publisher.connect();
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const id = (0, random_1.generateRandomString)();
    yield (0, simple_git_1.simpleGit)().clone(repoUrl, path_1.default.join(__dirname, `output/${id}`)).then(() => {
        console.log("cloned");
    }).catch((err) => {
        console.log(err);
    });
    const files = (0, filePaths_1.getAllFilePaths)(path_1.default.join(__dirname, `output/${id}`));
    console.log(files);
    const uploadPromise = Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const filename = file.slice(__dirname.length + 1).replace(/\\/g, "/");
        yield (0, aws_1.uploadFile)(filename, file.replace(/\\/g, "/"))
            .then(() => {
            console.log(`uploaded file ${filename}`);
        })
            .catch((err) => {
            console.log(err);
        });
    })));
    yield uploadPromise.then(() => {
        console.log("all files uploaded");
    }).catch((err) => {
        console.log(err);
    });
    publisher.lPush("build-queue", id);
    publisher.hSet("status", id, "uploaded");
    res.json({
        id: id,
    });
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // await uploadFile("src\index.ts", "C:\\Users\\aditya18.gupta\\OneDrive - Reliance Corporate IT Park Limited\\Desktop\\personal\\vercel\\dist\\utils\\filePaths.js")
    res.send("Hello Worl");
}));
app.get("/status/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const response = yield subscriber.hGet("status", id);
    res.json({
        status: response
    });
}));
// Start the server
app.listen(3000);
console.log("listening on port 3000");
