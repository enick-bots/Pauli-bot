const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

/* ================= CONFIGURACIÓN ================= */

// 100%
const ROL_100 = ["1457277032428863548"];

// porcentajes menores
const ROL_90 = [];
const ROL_85 = [];
const ROL_75 = [];
const ROL_65 = [];

/* ================================================ */

function getProb(member) {
  if (member.roles.cache.some(r => ROL_100.includes(r.id))) return 100;
  if (member.roles.cache.some(r => ROL_90.includes(r.id))) return 90;
  if (member.roles.cache.some(r => ROL_85.includes(r.id))) return 85;
  if (member.roles.cache.some(r => ROL_75.includes(r.id))) return 75;
  if (member.roles.cache.some(r => ROL_65.includes(r.id))) return 65;
  return 50;
}

// 🔒 ANTI SOSPECHA TOTAL
function decidirGanador({ p1, p2, score, objetivo, prob1, prob2 }) {
  // si ambos iguales → RNG puro
  if (prob1 === prob2) {
    return Math.random() < 0.5 ? p1 : p2;
  }

  const fuerte = prob1 > prob2 ? p1 : p2;
  const debil = fuerte.id === p1.id ? p2 : p1;

  const f = score[fuerte.id];
  const d = score[debil.id];

  // evitar palizas
  if (f - d >= 2 && f < objetivo - 1) return debil;

  // evitar 7-0 / 5-0 / 10-0
  if (f >= objetivo - 2 && d === 0) return debil;

  // final asegurado
  if (f === objetivo - 1 && d >= objetivo - 2) return fuerte;

  // probabilidad normal
  return Math.random() * 100 < Math.max(prob1, prob2) ? fuerte : debil;
}

module.exports = {
  name: "coinflip",

  async execute(client, message, args) {
    const p1 = message.mentions.users.at(0);
    const p2 = message.mentions.users.at(1);
    if (!p1 || !p2) {
      return message.reply("Uso: `*coinflip @jugador1 @jugador2`");
    }

    const m1 = await message.guild.members.fetch(p1.id);
    const m2 = await message.guild.members.fetch(p2.id);

    let rondasObjetivo = null;
    const elecciones = {};
    const score = { [p1.id]: 0, [p2.id]: 0 };

    // 📌 SELECCIÓN DE RONDAS
    const rowRondas = new ActionRowBuilder().addComponents(
      [1,3,5,7,10].map(n =>
        new ButtonBuilder()
          .setCustomId(`r_${n}`)
          .setLabel(`${n} Rondas`)
          .setStyle(ButtonStyle.Primary)
      )
    );

    const embed = new EmbedBuilder()
      .setColor("#f1c40f")
      .setTitle("🪙 Coinflip")
      .setDescription("Selecciona cuántas rondas jugar");

    const msg = await message.channel.send({
      embeds: [embed],
      components: [rowRondas]
    });

    const collector = msg.createMessageComponentCollector({ time: 120000 });

    collector.on("collect", async i => {
      // solo quien ejecutó el comando
      if (!rondasObjetivo && i.user.id !== message.author.id) {
        return i.reply({ content: "No puedes elegir rondas.", ephemeral: true });
      }

      // elegir rondas
      if (i.customId.startsWith("r_")) {
        rondasObjetivo = parseInt(i.customId.split("_")[1]);

        const rowLados = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("heads")
            .setLabel("🟡 Heads")
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId("tails")
            .setLabel("⚫ Tails")
            .setStyle(ButtonStyle.Secondary)
        );

        embed.setDescription(
          `🎯 **Rondas:** ${rondasObjetivo}\n\n${p1} y ${p2}\nElijan su lado`
        );

        await i.update({ embeds: [embed], components: [rowLados] });
        return;
      }

      // elegir lado
      if (![p1.id, p2.id].includes(i.user.id)) {
        return i.reply({ content: "No puedes usar esto.", ephemeral: true });
      }

      if (Object.values(elecciones).includes(i.customId)) {
        return i.reply({ content: "Ese lado ya fue elegido.", ephemeral: true });
      }

      elecciones[i.user.id] = i.customId;
      await i.reply({ content: `Elegiste **${i.customId}**`, ephemeral: true });

      // ambos listos → iniciar
      if (Object.keys(elecciones).length === 2) {
        collector.stop();

        const prob1 = getProb(m1);
        const prob2 = getProb(m2);

        while (
          score[p1.id] < rondasObjetivo &&
          score[p2.id] < rondasObjetivo
        ) {
          await new Promise(r => setTimeout(r, 1200));

          const ganador = decidirGanador({
            p1,
            p2,
            score,
            objetivo: rondasObjetivo,
            prob1,
            prob2
          });

          score[ganador.id]++;

          const marcador = `
${p1}: **${score[p1.id]}**
${p2}: **${score[p2.id]}**
          `;

          await message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setColor("#2ecc71")
                .setTitle("🪙 Resultado")
                .setDescription(marcador)
            ]
          });
        }

        const finalWinner =
          score[p1.id] === rondasObjetivo ? p1 : p2;

        await message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor("#9b59b6")
              .setTitle("🏆 Ganador")
              .setDescription(`🎉 **${finalWinner}** ganó el coinflip`)
          ]
        });
      }
    });
  }
};