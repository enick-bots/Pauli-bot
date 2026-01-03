const forcedNames = new Map();

module.exports = {
    name: "guildMemberUpdate",
    async execute(oldMember, newMember) {

        if (!forcedNames.has(newMember.id)) return;

        const forcedName = forcedNames.get(newMember.id);

        if (newMember.nickname !== forcedName) {
            await newMember.setNickname(forcedName).catch(() => {});
        }
    }
};
