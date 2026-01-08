module.exports = {
    name: "bbysita",

    async execute(client, message) {

        if (!message.guild) return;

        // 🎭 ROLES
        const ROL_1 = "1456867110285348970";

        const ROLES_2 = ["1457164602289688788", "1456498874826100933","1454018670568276029","1454018670568276029","1454018600577929216","1454018510152798342","1454014410816487477","1454014246403838058","1454013109634072618","1454013368276095163","1452495976723124234","1454024235792990229","1454024352352702546","1454024494560841758","1454024677226840095","1454032529056206920","1454032719720878124","1454032788692009061","1454032881369485332","1454032964563239025","1454033043596644352","1454032083986022555"
        ];

        const tieneRol1 = message.member.roles.cache.has(ROL_1);
        const tieneRol2 = message.member.roles.cache
            .some(role => ROLES_2.includes(role.id));

        // 📨 MENSAJES SEGÚN ROL
        if (tieneRol1) {
            return message.reply("soy tu zorryta uwu");
        }

        if (tieneRol2) {
            return message.reply("Tu que pendejo, imbecil fracasado");
        }

        message.reply("❌ No tienes ninguno de los roles requeridos.");
    }
};
