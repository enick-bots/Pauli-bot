const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "snipe",

    async execute(client, message) {
        const ROLES_PERMITIDOS = ["1454018600577929216","1454018510152798342","1454014410816487477","1454014246403838058","1454013109634072618","1454013368276095163","1452495976723124234","1454024235792990229","1454024352352702546","1454024494560841758","1454024677226840095","1454032529056206920","1454032719720878124","1454032788692009061","1454032881369485332","1454032964563239025","1454033043596644352","1454032083986022555"];

        if (!message.member.roles.cache.some(r => ROLES_PERMITIDOS.includes(r.id)))
            return message.reply("❌ No tienes permisos.");

        const data = client.snipes.get(message.channel.id);
        if (!data) return message.reply("❌ No hay mensajes borrados.");

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("🕵️ Mensaje eliminado")
            .addFields(
                { name: "Autor", value: data.author.tag },
                { name: "Mensaje", value: data.content || "Sin texto" }
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
