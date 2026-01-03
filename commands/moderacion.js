const warns = new Map();

module.exports = {
    name: "warn",

    async execute(client, message, args) {
        const ROLES_PERMITIDOS = ["1454018600577929216","1454018510152798342","1454014410816487477","1454014246403838058","1454013109634072618","1454013368276095163","1452495976723124234","1454024235792990229","1454024352352702546","1454024494560841758","1454024677226840095","1454032529056206920","1454032719720878124","1454032788692009061","1454032881369485332","1454032964563239025","1454033043596644352","1454032083986022555"];

        if (!message.member.roles.cache.some(r => ROLES_PERMITIDOS.includes(r.id)))
            return message.reply("❌ No tienes permisos.");
        const target = message.mentions.members.first();
        if (!target) return message.reply("❌ Menciona a alguien.");

        // ❌ No puedes warnear superiores
        if (target.roles.highest.position >= message.member.roles.highest.position)
            return message.reply("❌ No puedes warnear a alguien con un rol igual o superior.");

        const reason = args.slice(1).join(" ") || "Sin razón";

        if (!warns.has(target.id)) warns.set(target.id, 0);
        warns.set(target.id, warns.get(target.id) + 1);

        const total = warns.get(target.id);

        message.channel.send(`⚠️ **${target.user.tag}** recibió un warn.\nTotal: **${total}**`);

        // 🔥 3 warns = quitar rol más alto
        if (total === 3) {
            const role = target.roles.highest;
            await target.roles.remove(role);
            message.channel.send(`⚠️ Rol **${role.name}** removido.`);
        }

        // 🔥 5 warns = quitar todos menos uno
        if (total === 5) {
            const roleSafe = "1454019195397214260";

            target.roles.cache.forEach(r => {
                if (r.id !== roleSafe && r.id !== message.guild.id) {
                    target.roles.remove(r).catch(() => {});
                }
            });

            message.channel.send(`🚨 Todos los roles removidos.`);
        }
    }
};
