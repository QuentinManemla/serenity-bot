import {
  ChatInputCommandInteraction,
  Client,
  Events,
  GatewayIntentBits,
  REST as DiscordRestClient,
  Routes,
} from "discord.js";
import dotenv from "dotenv";
import { InteractionHandler } from "./handler";
dotenv.config();

const DISCORD_ACCESS_TOKEN = process.env.DISCORD_ACCESS_TOKEN || "";
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";

class SerenityApplication {
  private client: Client;
  private discordRestClient: DiscordRestClient;
  private interactionHandler: InteractionHandler;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      shards: "auto",
      failIfNotExists: false,
    });
    this.discordRestClient = new DiscordRestClient().setToken(
      DISCORD_ACCESS_TOKEN
    );
    this.interactionHandler = new InteractionHandler();
  }

  start() {
    this.client
      .login(DISCORD_ACCESS_TOKEN)
      .then(() => {
        this.addClientEventHandlers();
        this.registerSlashCommands();
      })
      .catch((err) => console.error("Error starting bot", err));
  }

  registerSlashCommands() {
    const commands = this.interactionHandler.getSlashCommands();
    this.discordRestClient
      .put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
        body: commands,
      })
      .then((data: any) => {
        console.log(
          `Successfully registered ${data.length} global application (/) commands`
        );
      })
      .catch((err) => {
        console.error("Error registering application (/) commands", err);
      });
  }

  addClientEventHandlers() {
    this.client.on(Events.InteractionCreate, (interaction) => {
      this.interactionHandler.handleInteraction(
        interaction as ChatInputCommandInteraction
      );
    });

    this.client.on(Events.ClientReady, () => {
      console.log("Serenity bot client logged in");
    });

    this.client.on(Events.Error, (err: Error) => {
      console.error("Client error", err);
    });
  }
}

const app = new SerenityApplication();
app.start();
