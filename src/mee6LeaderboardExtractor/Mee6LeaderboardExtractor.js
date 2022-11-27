import fetch from "node-fetch";
import * as path from "path";
import {sleep} from "../util/util";
import * as fs from "fs";

const BASE_URL = "https://mee6.xyz/api/plugins/levels/leaderboard/";

class Mee6LeaderboardExtractor {
    /**
     * @property {string} guildId
     */
    guildId;

    /**
     * @property {string} outputPath The output path file
     */
    outputPath;

    /**
     * @property {object[]} ranking The fetched ranking
     */
    ranking = [];

    constructor(guildId, outputPath) {
        this.guildId = guildId;
        this.outputPath = path.resolve(process.cwd(), outputPath);
    }

    extractLeaderboard = async () => {
        console.log("Extracting leaderboard...");

        let page = 0;

        do {
            console.log(`Fetching page ${page}`);

            const url = `${BASE_URL}${this.guildId}?page=${page}`
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`HTTP error returned while fetching ${url} - ${response.status}`);
                process.exit(1);
            }

            const responseJson = await response.json();

            const players = responseJson.players;

            if (players.length === 0) {
                console.log("No content, finished!")
                break;
            }

            console.log(`Found ${players.length} users`);

            this.ranking.push(...players);

            console.log("Waiting 2 seconds before fetching next page...");
            await sleep(2000);

            ++page;
        } while(true);

        console.log(`Writing ranking to ${this.outputPath}`);

        fs.mkdirSync(path.dirname(this.outputPath), {recursive: true});
        fs.writeFileSync(this.outputPath, JSON.stringify(this.ranking));

        console.log("Done");
    }
}

export default Mee6LeaderboardExtractor;
