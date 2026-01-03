const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Muestra información del servidor",

    async execute(client, message) {
        const guild = message.guild;

        const embed = new EmbedBuilder()
            .setColor("#00b0ff")
            .setTitle(`📊 Información de ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: "👑 Dueño", value: `<@${guild.ownerId}>`, inline: true },
                { name: "🧑‍🤝‍🧑 Miembros", value: `${guild.memberCount}`, inline: true },
                { name: "📅 Creado", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "💬 Canales", value: `${guild.channels.cache.size}`, inline: true },
                { name: "🎭 Roles", value: `${guild.roles.cache.size}`, inline: true }
            )
            .setFooter({ text: "Pauli Bot" });

        message.reply({ embeds: [embed] });
    }
};
