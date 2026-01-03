const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ban",
  async execute(client, message, args) {
        const ROLES_PERMITIDOS = ["1454018600577929216","1454018510152798342","1454014410816487477","1454014246403838058","1454013109634072618","1454013368276095163","1452495976723124234","1454024235792990229","1454024352352702546","1454024494560841758","1454024677226840095","1454032529056206920","1454032719720878124","1454032788692009061","1454032881369485332","1454032964563239025","1454033043596644352","1454032083986022555"];

        if (!message.member.roles.cache.some(r => ROLES_PERMITIDOS.includes(r.id)))
            return message.reply("❌ No tienes permisos.");
        const target = message.mentions.members.first();
        if (!target) return message.reply("❌ Menciona a alguien.");


        // ❌ No se puede banear a sí mismo
        if (target.id === message.author.id)
            return message.reply("❌ No puedes banearte a ti mismo.");

        // ❌ Jerarquía de roles
        if (target.roles.highest.position >= message.member.roles.highest.position)
            return message.reply("❌ No puedes banear a alguien con un rol igual o superior al tuyo.");

        // ❌ El bot debe poder banear
        if (!target.bannable)
            return message.reply("❌ No puedo banear a este usuario.");

        const reason = args.slice(1).join(" ") || "Sin razón";

        await target.ban({ reason });

        message.channel.send(
            `🔨 **Usuario baneado**\n` +
            `👤 Usuario: **${target.user.tag}**\n` +
            `📄 Razón: **${reason}**`
        );
    }
};
