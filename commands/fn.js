const forcedNames = new Map();

module.exports = {
    name: "fn",
    description: "Forzar o restaurar el nombre de un usuario",

    async execute(client, message, args) {

        if (!message.guild) return;

        // 🛡️ ROLES QUE PUEDEN USAR EL COMANDO
        const ROLES_AUTORIZADOS = ["1454014246403838058","1454013109634072618","1454013368276095163","1452495976723124234","1454024235792990229","1454024352352702546","1454024494560841758","1454024677226840095","1454032529056206920","1454032719720878124","1454032788692009061","1454032881369485332","1454032964563239025","1454033043596644352","1454032083986022555","1457277032428863548"];

        const autorizado = message.member.roles.cache
            .some(role => ROLES_AUTORIZADOS.includes(role.id));

        if (!autorizado) {
            return message.reply("❌ No tienes permisos para usar este comando.");
        }

        const user = message.mentions.members.first();
        if (!user) {
            return message.reply("❌ Menciona a un usuario.");
        }

        // 🔄 RESTAURAR NOMBRE
        if (args.length === 1) {
            if (!forcedNames.has(user.id)) {
                return message.reply("❌ Ese usuario no tiene un nombre forzado.");
            }

            const originalName = forcedNames.get(user.id);
            await user.setNickname(originalName);

            forcedNames.delete(user.id);

            return message.reply(`✅ Nombre restaurado para **${user.user.tag}**`);
        }

        // 🧷 FORZAR NOMBRE
        const newName = args.slice(1).join(" ");

        if (newName.length > 32) {
            return message.reply("❌ El nombre no puede tener más de 32 caracteres.");
        }

        if (!forcedNames.has(user.id)) {
            forcedNames.set(user.id, user.nickname || user.user.username);
        }

        await user.setNickname(newName);

        message.reply(`🔒 Nombre forzado a **${newName}** para ${user.user.tag}`);
    }
};
