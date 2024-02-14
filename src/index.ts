import express from "express";
import cors from "cors";
import { generateRandomString } from "./utils/random";
import { simpleGit } from "simple-git";
import { getAllFilePaths } from "./utils/filePaths";
import path from "path";
import { uploadFile } from "./utils/aws";
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json())


app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl
    console.log(repoUrl);
    const id = generateRandomString();
    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`))

    const files = getAllFilePaths(path.join(__dirname,`output/${id}`))
    files.forEach(async (file) =>{
        await uploadFile(file.slice(__dirname.length+1),file)
    })
    
    res.json({
        id:id,
        })
})
app.get("/", async (req, res) => {
    await uploadFile("src\index.ts", "C:\\Users\\aditya18.gupta\\OneDrive - Reliance Corporate IT Park Limited\\Desktop\\personal\\vercel\\dist\\utils\\filePaths.js")
    res.send("Hello Worl")
})
 
// Start the server
app.listen(3000);
console.log("listening on port 3000")