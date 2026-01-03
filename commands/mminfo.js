const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "mminfo",
    description: "Genera un mensaje embed que solo roles específicos pueden usar.",

    async execute(client, message, args) {

        if (!message.guild) return;

        const ROLES_PERMITIDOS_IDS = [
            "1454018670568276029",
            "1454014410816487477",
            "1454013368276095163",
            "1454024494560841758",
            "1454024677226840095",
            "1454032083986022555",
            "1454032881369485332",
            "1454033043596644352"
        ];

        const tieneRolPermitido = message.member.roles.cache
            .some(role => ROLES_PERMITIDOS_IDS.includes(role.id));

        if (!tieneRolPermitido) {
            return message.reply("❌ No tienes permisos para usar este comando.");
        }

        const embed = new EmbedBuilder()
            .setColor("#e21919")
            .setTitle("📌 INFORMACIÓN DE MIDDLEMAN")
            .setDescription(`
🔹 **¿Qué hace el middleman?**  
El middleman que atienda el ticket te ayudará a realizar un trade seguro para ambas partes, evitando estafas o uso de scripts.

🔹 **¿Cómo funciona?**  
• El middleman pedirá un link de SAB  
• Se entregarán los brainrots **uno por uno**  
• Luego el middleman pasará todo a una cuenta segura  
• Finalmente enviará las partes correspondientes a cada usuario  

🔹 **Importante**  
El primero en entregar acepta el método del servidor.  
Todo se realiza bajo supervisión.
            `)
            .setFooter({ text: "Pauli | Enick" });

        message.reply({ embeds: [embed] });
    }
};
