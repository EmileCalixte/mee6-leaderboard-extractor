import * as path from "path";

class Mee6LeaderboardExtractor {
    /**
     * @property {number} guildId
     */
    guildId;

    /**
     * @property {string} outputPath The output path file
     */
    outputPath;

    constructor(guildId, outputPath) {
        this.guildId = guildId;
        this.outputPath = path.resolve(process.cwd(), outputPath);
    }

    extractLeaderboard = () => {
        console.log("TODO extract", this.guildId, this.outputPath);
    }
}

export default Mee6LeaderboardExtractor;
