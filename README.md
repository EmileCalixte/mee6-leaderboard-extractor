# Mee6 Leaderboard Extractor

## Run project

```sh 
docker compose run
```

## Run build in container

```sh 
docker compose exec node node ./dist/main.js
```

## Create production builds

```sh 
docker compose run node npm run build
```

## Usage

Write leaderboard in `output/leaderboard.json`:

```sh 
node main.js --guild <guildId>
```

Write leaderboard in a specified file path:

```sh 
node main.js --guild <guildId> --output ./path/to/file.json
```
