import commandLineArgs from "command-line-args/dist/index.mjs";
import Mee6LeaderboardExtractor from "./mee6LeaderboardExtractor/Mee6LeaderboardExtractor";
import * as path from "path";

const args = commandLineArgs([
    {name: "guild", alias: "g", type: Number},
    {name: "output", alias: "o", type: String, defaultValue: path.resolve(process.cwd(), "./output/leaderboard.json")},
]);

const requiredArgs = [
    ["guild", "The guild ID"],
];

let argsAreMissing = false;

for (const [requiredArg, description] of requiredArgs) {
    if (!args.hasOwnProperty(requiredArg)) {
        console.error(`Missing argument '${requiredArg}': ${description}`);
        argsAreMissing = true;
    }
}

if (argsAreMissing) {
    process.exit(1);
}

const extractor = new Mee6LeaderboardExtractor(args.guild, args.output);

extractor.extractLeaderboard();
