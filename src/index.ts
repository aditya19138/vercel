import express from "express";
import cors from "cors";
import { generateRandomString } from "./utils/random";
import { simpleGit } from "simple-git";
import { getAllFilePaths } from "./utils/filePaths";
import path from "path";

const app = express();
app.use(cors())
app.use(express.json())


app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl
    console.log(repoUrl);
    const id = generateRandomString();
    await simpleGit().clone(repoUrl, `output/${id}`)
    res.json({})
})
app.get("/", (req, res) => {
    // const id = vercel\output\jGrwJrVGeZ
    const paths = getAllFilePaths(path.join(__dirname));
    console.log(paths);
    res.send(paths);
})

// Start the server
app.listen(3000);
console.log("listening on port 3000")