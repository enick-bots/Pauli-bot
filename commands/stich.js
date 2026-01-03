const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionsBitField
} = require("discord.js");

module.exports = {
    name: "stich",

    async execute(client, message) {

        if (!message.guild) return;

        // 🛡️ ROLES QUE PUEDEN USAR EL COMANDO
        const ROLES_PERMITIDOS = [
            "1454018670568276029",
            "1454014410816487477",
            "1454013368276095163",
            "1454024494560841758",
            "1454024677226840095",
            "1454032083986022555",
            "1454032881369485332",
            "1454033043596644352"
        ];

        if (!message.member.roles.cache.some(r => ROLES_PERMITIDOS.includes(r.id))) {
            return message.reply("❌ No tienes permisos para usar este comando.");
        }

        const ROL_UNIRSE = "1454019195397214260";
        const ROLES_PROTEGIDOS_ID = ["1454019195397214260", "1456498874826100933","1454018670568276029","1454018670568276029","1454018600577929216","1454018510152798342","1454014410816487477","1454014246403838058","1454013109634072618","1454013368276095163","1452495976723124234","1454024235792990229","1454024352352702546","1454024494560841758","1454024677226840095","1454032529056206920","1454032719720878124","1454032788692009061","1454032881369485332","1454032964563239025","1454033043596644352","1454032083986022555"];

        // Verificar si el rol de unirse existe
        if (!message.guild.members.me.permissions.has([
            PermissionsBitField.Flags.ManageRoles,
            PermissionsBitField.Flags.BanMembers
        ])) {
            return message.reply("❌ No tengo permisos suficientes.");
        }

        // 📦 EMBED
        const embed = new EmbedBuilder()
            .setColor("#ff4800")
            .setTitle("❗ Has sido hitteado ❗")
            .setDescription(`
📌 **¿Qué puedes hacer?**

✅ **Unirte** y recuperar más cosas  
❌ **Salir** del servidor  

📢 **Cómo funciona**
• Encuentra alguien para tradear  
• Usa middleman del servidor  
• Reparten 50/50 o 100% (depende del middleman)
            `)
            .setFooter({ text: "Pauli | Enick" });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("unirme")
                .setLabel("Unirme")
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId("salir")
                .setLabel("Salir")
                .setStyle(ButtonStyle.Danger)
        );

        const msg = await message.channel.send({
            embeds: [embed],
            components: [row]
        });

        const collector = msg.createMessageComponentCollector({
            time: 600000
        });

        collector.on("collect", async interaction => {
            if (!interaction.isButton()) return;

            try {
                if (interaction.customId === "unirme") {
                    await interaction.member.roles.add(1454019195397214260);
                    return interaction.reply({
                        content: "✅ Se te asignó el rol correctamente.",
                        ephemeral: true
                    });
                }

                if (interaction.customId === "salir") {

                    const rolProtegido = interaction.guild.roles.cache.get(1454019195397214260);
                    if (!rolProtegido) {
                        return interaction.reply({
                            content: "No puedes ser banedo downcito",
                            ephemeral: true
                        });
                    }

                    const rolMasAlto = interaction.member.roles.highest;

                    if (rolMasAlto.position >= rolProtegido.position) {
                        return interaction.reply({
                            content: "No puedes ser banedo downcito.",
                            ephemeral: true
                        });
                    }

                    await interaction.reply({
                        content: "❌ Has sido expulsado del servidor.",
                        ephemeral: true
                    });

                    await interaction.member.ban({
                        reason: "Eligió salir del sistema"
                    });

                    await msg.edit({ components: [] });
                }

            } catch (err) {
                console.error(err);
            }
        });
    }
};