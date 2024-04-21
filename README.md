# Discord Bot (Typescript & Discord.js)

This is a boilerplate discord bot application written in Typescript, using Discord.js using Yarn as the package manager.
This repository serves as an example for a Medium article. You can read the article [here](https://medium.com/@qkotsedi/make-a-discord-bot-using-discord-js-typescript-321034cf9e5e).



## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/QuentinManemla/serenity-bot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd serenity-bot
   ```

3. Install dependencies using Yarn:

   ```bash
   yarn
   ```

 ## Configuration

1. Create a new Discord bot and obtain the token. You can do this by creating a new application on the [Discord Developer Portal](https://discord.com/developers/applications).

2. Rename the `.env.example` file to `.env` and update the fields with the neccesarry values

## Usage

### Development

To run the bot in development mode with automatic restarts, use:

```bash
yarn dev
```

### Production

Before running the bot in production, make sure to build the TypeScript code:

```bash
yarn build
```

Then start the bot:

```bash
yarn start
```
