const warns = new Map();

module.exports = {
    name: "unwarn",

    async execute(client, message, args) {
        const ROLES_PERMITIDOS = ["1454013368276095163","1452495976723124234","1454024235792990229","1454024352352702546","1454024494560841758","1454024677226840095","1454032529056206920","1454032719720878124","1454032788692009061","1454032881369485332","1454032964563239025","1454033043596644352","1454032083986022555"];

        if (!message.member.roles.cache.some(r => ROLES_PERMITIDOS.includes(r.id)))
            return message.reply("❌ No tienes permisos.");

        const user = message.mentions.members.first();
        if (!user) return message.reply("❌ Menciona a alguien.");

        warns.set(user.id, 0);
        message.reply(`✅ Warns reiniciados para ${user.user.tag}`);
    }
};
