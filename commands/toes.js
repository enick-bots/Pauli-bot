const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "toes",
    description: "Genera un mensaje embed que solo roles específicos pueden usar.",

    async execute(client, message, args) {

        if (!message.guild) return;

        const ROLES_PERMITIDOS_IDS = [
          "1456498874826100933",
            "1454018670568276029",
            "1454018600577929216",
            "1454018510152798342",
            "1454014410816487477",
            "1454014246403838058",
            "1454013109634072618",
            "1454013368276095163",
            "1452495976723124234",
            "1454024235792990229",
            "1454024352352702546",
            "1454024494560841758",
            "1454024677226840095",
            "1454032529056206920",
            "1454032719720878124",
            "1454032788692009061",
            "1454032881369485332",
            "1454032964563239025",
            "1454033043596644352",
            "1454032083986022555"
        ];

        const tieneRolPermitido = message.member.roles.cache
            .some(role => ROLES_PERMITIDOS_IDS.includes(role.id));

        if (!tieneRolPermitido) {
            return message.reply("No existe este comando.");
        }

        const embed = new EmbedBuilder()
            .setColor("#e21919")
            .setTitle("¿Quieres aprender a cómo estafar? 🤔")
            .setDescription(
`🔒 Asegúrate de estar verificado en el canal **verify**

🔎 Busca víctimas en otros servidores o aquí si no tienen el rol **ordered from site**

🧑‍💼 Diles que usen middleman de este servidor

🕵️ Te ayudaremos a asegurar el objeto

✅ Una vez realizado recibirás tu parte

🤝 El middleman repartirá los objetos`
            )
            .setFooter({ text: "Pauli | Enick" });

        message.reply({ embeds: [embed] });
    }
};
