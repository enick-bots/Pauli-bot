// ==============================
// 🌐 KEEP ALIVE (EXPRESS)
// ==============================
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🤖 Bot activo 24/7");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🟢 Keep-alive activo en el puerto", PORT);
});

// ==============================
// 🤖 DISCORD BOT
// ==============================
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.User
  ]
});

// 🔹 PREFIX MÚLTIPLES
const PREFIXES = ["*", "!", ",", "$"];

// 📦 COMANDOS
client.prefixCommands = new Collection();

const fs = require("fs");
const path = require("path");

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command.name && command.execute) {
    client.prefixCommands.set(command.name, command);
  } else {
    console.warn(`⚠️ Comando mal configurado: ${file}`);
  }
}

// ✅ BOT LISTO
client.on("ready", () => {
  console.log(`🤖 Bot encendido como ${client.user.tag}`);
});

// 🧠 ANTI DUPLICADO
const handledMessages = new Set();

// 📩 MENSAJES
client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (handledMessages.has(message.id)) return;
  handledMessages.add(message.id);
  setTimeout(() => handledMessages.delete(message.id), 5000);

  // Detectar prefix válido
  const prefix = PREFIXES.find(p => message.content.startsWith(p));
  if (!prefix) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  const command = client.prefixCommands.get(commandName);

  // ❌ COMANDO NO EXISTE (EPHEMERAL SIMULADO)
  if (!command) {
    const reply = await message.reply("❌ **Ese comando no existe.**");

    setTimeout(() => {
      message.delete().catch(() => {});
      reply.delete().catch(() => {});
    }, 5000);
    return;
  }

  // ▶️ EJECUTAR
  try {
    await command.execute(client, message, args);
  } catch (err) {
    console.error(err);
    const errMsg = await message.reply("❌ Error al ejecutar el comando.");
    setTimeout(() => errMsg.delete().catch(() => {}), 5000);
  }
});

// 🕵️ SNIPE
client.snipes = new Map();

client.on("messageDelete", msg => {
  if (!msg.guild || msg.author?.bot) return;
  client.snipes.set(msg.channel.id, {
    content: msg.content,
    author: msg.author
  });
});

// 🔑 LOGIN
client.login(process.env.TOKEN);