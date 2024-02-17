import { exec, spawn } from 'child_process';
import path from 'path';

export function buildProject(id: string) {
    return new Promise((resolve) => {
        const projectPath = path.join(__dirname, `output/${id}`);
        console.log("Building project", projectPath);
        const childProcess = exec(`cd ${projectPath} && npm install && npm run build`);
        childProcess.stdout?.on('data', (data) => {
            console.log("stdout:" + data);
        });
        childProcess.stderr?.on('data', (data) => {
            console.log("stderr:" + data);
        });
        childProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve("");
        });
        console.log("done 0")

    });
}