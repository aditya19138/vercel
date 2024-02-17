import { createClient, commandOptions } from "redis";
import { copyFinalBuild, downloadS3Folder } from "./aws";
import { buildProject } from "./build";
const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function main() {
    while (1) {
        const response = await subscriber.brPop(
            commandOptions({ isolated: true }),
            "build-queue",
            0
        );
        console.log(response);

        const id = response?.element;

        await downloadS3Folder(`output/${id}`);
        //@ts-ignore
        await buildProject(id);
        //@ts-ignore
        await copyFinalBuild(id);
        // @ts-ignore
        publisher.hSet("status", id, "deployed");


    }
}

main();