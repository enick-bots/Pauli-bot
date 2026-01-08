const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "helpprice",
    description: "Ayuda para ver los precios de los brainrots",

    async execute(client, message) {

        const brainrots = [
            { name: "Los Bros", aliases: ["losbros","lb","bros","br"] },
            { name: "Los Hotspotsitos", aliases: ["loshotspotsitos","lhp","hots","potsitos"] },
            { name: "Los Primos", aliases: ["losprimos","lp","primos","prim"] },
            { name: "Los Puggies", aliases: ["lospuggies","pug","puggies"] },
            { name: "Los Spaghettis", aliases: ["losspaghettis","spaghettis","spag"] },
            { name: "Los Tacorita", aliases: ["lostacorita","tacorita","lt","taco2"] },
            { name: "Meowl", aliases: ["meowl","miau","meo","meow"] },
            { name: "Money Money Puggy", aliases: ["moneymoneypuggy","mmp","money","puggy"] },
            { name: "Nuclearo Dinossauro", aliases: ["nuclearodinossauro","nuclear","nd","dino"] },
            { name: "Tralaledon", aliases: ["tralaledon","tr","tralale","tral"] },

            { name: "W or L", aliases: ["worl","w"] },
            { name: "Reinito Sleiguito", aliases: ["reinitosleiguito","reinito","sleiguito"] },
            { name: "Spaghetti Tualetti", aliases: ["spaghettitualetti","spaghetti","tua"] },
            { name: "Spooky and Pumpky", aliases: ["spookyandpumpky","sp","pumpky","spump","spookypump"] },
            { name: "Strawberry Elephant", aliases: ["strawberryelephant","se","straw","elephant"] },
            { name: "Swaggy Bros", aliases: ["swaggybros","swaggy","sb"] },
            { name: "Tacorita Bicicleta", aliases: ["tacoritabicicleta","bici","tb"] },
            { name: "Tang Tang Keletang", aliases: ["tangtangkeletang","ttk","keletang","tang"] },
            { name: "La Extinct Grande", aliases: ["laextinctgrande","leg","ext"] },
            { name: "La Gringer Sekolah", aliases: ["gringersekolah","sekolah"] },

            { name: "La Jolly Grande", aliases: ["lajollygrande","jolly","ljg"] },
            { name: "La Secret Combinasion", aliases: ["lasecretcombinasion","lsec","secret","sec"] },
            { name: "La Spooky Grande", aliases: ["laspookygrande","lsg","spooky","spook","spookygrande"] },
            { name: "La Supreme Combinasion", aliases: ["lasupremecombinasion","supreme"] },
            { name: "La Taco Combinasion", aliases: ["latacocombinasion","taco","ltc"] },
            { name: "Las Sis", aliases: ["lassis","ls","sis","lasi"] },
            { name: "Lavadorito Spinito", aliases: ["lavadoritospinito","lavadorito","spinito"] },
            { name: "Eviledon", aliases: ["eviledon","ev","evil","edon"] },
            { name: "Festive 67", aliases: ["festive67","festive","f67"] },
            { name: "Burguro and Fryuro", aliases: ["burguroandfryuro","bf","burguro","fryuro"] },

            { name: "Capitano Moby", aliases: ["capitano","cm","moby"] },
            { name: "Fishino Clownino", aliases: ["fishinoclownino","fishino","clownino"] },
            { name: "Fragrama and Chocrama", aliases: ["fragrama","fac","chocrama","fc"] },
            { name: "Ginger Gerat", aliases: ["gingergerat","ginger","gg"] },
            { name: "Headless Horseman", aliases: ["headless","hh","horseman","head"] },
            { name: "Jolly Jolly Sahur", aliases: ["jollysahur","sahur","js"] },
            { name: "Ketchuru and Musturu", aliases: ["ketchuruandmusturu","km","musturu","ketchuru"] },
            { name: "Ketupat Kepat", aliases: ["ketupatkepat","kk","ketupat","kepat"] },
            { name: "La Casa Boo", aliases: ["lacasa","lcb","boo","casa"] },
            { name: "Celularini Viciosini", aliases: ["celulariniviciosini","ccv","celular","vicio"] },

            { name: "Chilin Chili", aliases: ["chillinchili","cc","chili","chill"] },
            { name: "Chipso and Queso", aliases: ["chipsoandqueso","cq","chipso"] },
            { name: "Cooki and Milki", aliases: ["cookiandmilki","cooki","milki","cam"] },
            { name: "Dragon Cannelloni", aliases: ["dragoncannelloni","dc","dragon","drag"] },
            { name: "Garama and Madundung", aliases: ["garamaandmadundung","garama","madundung","gm"] },
            {name: "Dragon Gingerini", aliases: ["dragongingerini","dg","gingerini"] },
            {name: "Money Money Reindeer", aliases: ["moneymoneyreindeer","mmr","reindeer"] },
            {name: "Tuff Toucan", aliases: ["tufftoucan","tt","toucan"] },
        ];

        const itemsPerPage = 10;
        let page = 0;

        const generateEmbed = () => {
            const start = page * itemsPerPage;
            const current = brainrots.slice(start, start + itemsPerPage);

            const description = current.map(br =>
                `⭐ **${br.name}**\n` +
                `Alias: ${br.aliases.map(a => `\`${a}\``).join(", ")}\n` +
                `Ej: \`*price ${br.aliases[0]} 100\`\n`
            ).join("\n");

            return new EmbedBuilder()
                .setColor("#2ecc71")
                .setTitle("📘 AYUDA PARA VER LOS PRECIOS DE TUS BRAINROTS")
                .setDescription(description)
                .setFooter({ text: `Página ${page + 1} / ${Math.ceil(brainrots.length / itemsPerPage)}` });
        };

        const msg = await message.channel.send({ embeds: [generateEmbed()] });

        await msg.react("⬅️");
        await msg.react("➡️");

        const filter = (reaction, user) =>
            ["⬅️", "➡️"].includes(reaction.emoji.name) && user.id === message.author.id;

        const collector = msg.createReactionCollector({ filter, time: 60000 });

        collector.on("collect", reaction => {
            reaction.users.remove(message.author);

            if (reaction.emoji.name === "➡️") {
                if ((page + 1) * itemsPerPage < brainrots.length) page++;
            } else if (reaction.emoji.name === "⬅️") {
                if (page > 0) page--;
            }

            msg.edit({ embeds: [generateEmbed()] });
        });
    }
};
