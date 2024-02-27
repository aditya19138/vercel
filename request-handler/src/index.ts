import express from "express";
import { S3 } from "aws-sdk";
require("dotenv").config();
import url from "url";
const AWS = require('aws-sdk');

AWS.config.logger = console; // Enable logging to console

const app = express();
const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT, 

});

app.get("/*", async (req, res) => { 
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;
    
    console.log(filePath);
    const content = await s3.getObject({
        Bucket: "vercel", 
        Key: `dist/${id}${filePath}`,
    }).promise();

    const contentType = filePath.endsWith(".html") ? "text/html" : filePath.endsWith(".css") ? "text/css" : "application/javascript";
    res.set("Content-Type", contentType);

    res.send(content.Body); 
});
app.listen(3001, () => { 
    console.log("Server is running on port 3001");
});
  