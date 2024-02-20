import express from "express";
import cors from "cors";
import { generateRandomString } from "./utils/random";
import { simpleGit } from "simple-git";
import { getAllFilePaths } from "./utils/filePaths";
import path from "path";
import { uploadFile } from "./utils/aws";
require("dotenv").config();
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();

const app = express();
app.use(cors())
app.use(express.json())


app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl
    console.log(repoUrl);
    const id = generateRandomString();
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`)).then(() => {
        console.log("cloned")
    }).catch((err) => {
        console.log(err)
    });

    const files = getAllFilePaths(path.join(__dirname, `output/${id}`))
    console.log(files)
    
    const uploadPromise = Promise.all( 
        files.map(async (file) => {
            const filename = file.slice(__dirname.length + 1).replace(/\\/g, "/")
            await uploadFile(filename, file.replace(/\\/g, "/"))
            .then(() => {
                console.log(`uploaded file ${filename}`)
            })
            .catch((err) => {
                console.log(err)
            })

        })
    );
    await uploadPromise.then(() => {
        console.log("all files uploaded")
    }).catch((err) => {
        console.log(err)
    });

    publisher.lPush("build-queue", id);
    publisher.hSet("status", id, "uploaded");

    res.json({
        id: id,
    })
})
app.get("/", async (req, res) => {
    // await uploadFile("src\index.ts", "C:\\Users\\aditya18.gupta\\OneDrive - Reliance Corporate IT Park Limited\\Desktop\\personal\\vercel\\dist\\utils\\filePaths.js")
    res.send("Hello Worl")
})
app.get("/status/:id", async (req, res) => {
    const id = req.params.id;
    const response = await subscriber.hGet("status", id);
    res.json({
        status: response
    })


});

// Start the server
app.listen(3000);
console.log("listening on port 3000")