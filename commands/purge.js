const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: "c",

    async execute(client, message, args) {

        const ROLES_PERMITIDOS = ["1454013868899700828"];

        if (!message.member.roles.cache.some(r => ROLES_PERMITIDOS.includes(r.id)))
            return message.reply("❌ No tienes permiso.");

        const cantidad = parseInt(args[0]);
        if (!cantidad || cantidad < 1 || cantidad > 100)
            return message.reply("❌ Usa: *c <1-100>");

        await message.channel.bulkDelete(cantidad, true);

        const msg = await message.channel.send(`🧹 ${cantidad} mensajes borrados.`);
        setTimeout(() => msg.delete(), 3000);
    }
};
