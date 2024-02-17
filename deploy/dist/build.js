"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProject = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
function buildProject(id) {
    return new Promise((resolve) => {
        var _a, _b;
        const projectPath = path_1.default.join(__dirname, `output/${id}`);
        console.log("Building project", projectPath);
        const childProcess = (0, child_process_1.exec)(`cd ${projectPath} && npm install && npm run build`);
        (_a = childProcess.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            console.log("stdout:" + data);
        });
        (_b = childProcess.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            console.log("stderr:" + data);
        });
        childProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve("");
        });
        console.log("done 0");
    });
}
exports.buildProject = buildProject;
