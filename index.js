 const { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
require('dotenv').config(); 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, 
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User],
});

client.prefixCommands = new Collection(); 
const PREFIX = '*'; 

const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.name && command.execute) {
        client.prefixCommands.set(command.name, command);
    } else {
        console.warn(`[ADVERTENCIA] El comando en ${filePath} no tiene las propiedades "name" o "execute".`);
    }
}


client.on('ready', () => {
console.log(`🤖 | Bot encendido con la cuenta de: ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return; 
    if (!message.content.startsWith(PREFIX)) return; 

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    try {
        await command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('Hubo un error al ejecutar ese comando!');
    }
});

client.login(process.env.TOKEN); 
client.snipes = new Map();

client.on("messageDelete", msg => {
    if (!msg.guild || msg.author.bot) return;

    client.snipes.set(msg.channel.id, {
        content: msg.content,
        author: msg.author
    });
});
client.login(process.env.TOKEN); 