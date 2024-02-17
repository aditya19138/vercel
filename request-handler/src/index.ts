import express from "express";
import { S3 } from "aws-sdk";
require("dotenv").config();
import url from "url";

const app = express();
const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT,

});

app.get("/*", async (req, res) => {
    const host = req.headers.host || "";

    console.log("host = ", host);

    const id = host.split(".")[0];
    console.log("id = ", id);
    const filePath = req.path;
    console.log("filePath = ", filePath);

    console.log("key = ", `build${filePath}`)

    const content = await s3.getObject({
        Bucket: "vercel",
        Key: `build${filePath}`,
    }).promise();

    const contentType = filePath.endsWith(".html") ? "text/html" : filePath.endsWith(".css") ? "text/css" : "application/javascript";
    res.setHeader("Content-Type", contentType);

    // @ts-ignore
    res.send(`Hello ${id} and path is ${filePath} with content ${content.Body}`);
});
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
