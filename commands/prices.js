const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "price",
    description: "Calcula el precio de un brainrot",

    async execute(client, message, args) {
        const alias = args[0]?.toLowerCase();
        const M = parseFloat(args[1]);

        if (!alias || isNaN(M)) {
            return message.reply("❌ Uso correcto: `*price <alias> <millones>`");
        }

        // 🧠 BASE DE DATOS DE BRAINROTS
        const brainrots = [
            // ===== LOS =====
            { name: "Los Bros", aliases: ["losbros","lb","bros","br"], A: 24, B: 0.01, C: 3 },
            { name: "Los Hotspotsitos", aliases: ["loshotspotsitos","lhp","hots","potsitos"], A: 20, B: 0.01, C: 5 },
            { name: "Los Primos", aliases: ["losprimos","lp","primos","prim"], A: 31, B: 0.01, C: 5 },
            { name: "Los Puggies", aliases: ["lospuggies","pug","puggies"], A: 30, B: 0.01, C: 1.5 },
            { name: "Los Spaghettis", aliases: ["losspaghettis","spaghettis","spag"], A: 70, B: 0.01, C: 3 },
            { name: "Los Tacorita", aliases: ["lostacorita","tacorita","lt","taco2"], A: 32, B: 0.01, C: 5 },

            // ===== OTROS =====
            { name: "Meowl", aliases: ["meowl","miau","meo","meow"], A: 400, B: 0.3, C: 500 },
            { name: "Money Money Puggy", aliases: ["moneymoneypuggy","mmp","money","puggy"], A: 21, B: 0.01, C: 1.5 },
            { name: "Nuclearo Dinossauro", aliases: ["nuclearodinossauro","nuclear","nd","dino"], A: 15, B: 0.01, C: 3 },
            { name: "Tralaledon", aliases: ["tralaledon","tr","tralale","tral"], A: 27.5, B: 0.02, C: 6 },
            { name: "W or L", aliases: ["worl","w"], A: 30, B: 0.01, C: 3 },
            { name: "Reinito Sleiguito", aliases: ["reinitosleiguito","reinito","sleiguito"], A: 140, B: 0.02, C: 30 },
            { name: "Spaghetti Tualetti", aliases: ["spaghettitualetti","spaghetti","tua"], A: 60, B: 0.01, C: 2.5 },
            { name: "Spooky and Pumpky", aliases: ["spookyandpumpky","sp","pumpky","spump","spookypump"], A: 80, B: 0.01, C: 12 },
            { name: "Strawberry Elephant", aliases: ["strawberryelephant","se","straw","elephant"], A: 350, B: 0.3, C: 700 },
            { name: "Swaggy Bros", aliases: ["swaggybros","swaggy","sb"], A: 40, B: 0.01, C: 3 },
            { name: "Tacorita Bicicleta", aliases: ["tacoritabicicleta","bici","tb"], A: 16.5, B: 0.01, C: 2 },
            { name: "Tang Tang Keletang", aliases: ["tangtangkeletang","ttk","keletang","tang"], A: 33.5, B: 0.02, C: 3 },
            { name:  "Money Money Reindeer", aliases:["moneymoneyreindeer","mmr","reindeer"], A:25, B: 0.01, C: 3},
            { name: "Tuff Toucan", aliases: ["tufftoucan","tt","toucan"], A: 26, B: 0.01, C: 3.5 },
            // ===== LA =====
            { name: "La Extinct Grande", aliases: ["laextinctgrande","leg","ext"], A: 23.5, B: 0.01, C: 2 },
            { name: "La Gringer Sekolah", aliases: ["gringersekolah","sekolah"], A: 75, B: 0.02, C: 5 },
            { name: "La Jolly Grande", aliases: ["lajollygrande","jolly","ljg"], A: 30, B: 0.01, C: 2 },
            { name: "La Secret Combinasion", aliases: ["lasecretcombinasion","lsec","secret","sec"], A: 125, B: 0.01, C: 7 },
            { name: "La Spooky Grande", aliases: ["laspookygrande","lsg","spooky","spook","spookygrande"], A: 24.5, B: 0.01, C: 2 },
            { name: "La Supreme Combinasion", aliases: ["lasupremecombinasion","supreme"], A: 40, B: 0.11, C: 32 },
            { name: "La Taco Combinasion", aliases: ["latacocombinasion","taco","ltc"], A: 35, B: 0.01, C: 4 },
            { name: "Las Sis", aliases: ["lassis","ls","sis","lasi"], A: 17.5, B: 0.02, C: 1 },
            { name: "Lavadorito Spinito", aliases: ["lavadoritospinito","lavadorito","spinito"], A: 45, B: 0.02, C: 6 },

            // ===== OTROS GRANDES =====
            { name: "Eviledon", aliases: ["eviledon","ev","evil","edon"], A: 31.5, B: 0.01, C: 3 },
            { name: "Festive 67", aliases: ["festive67","festive","f67"], A: 67, B: 0.01, C: 14 },
            { name: "Burguro and Fryuro", aliases: ["burguroandfryuro","bf","burguro","fryuro"], A: 150, B: 0.01, C: 18 },
            { name: "Capitano Moby", aliases: ["capitano","cm","moby"], A: 160, B: 0.02, C: 28 },
            { name: "Fishino Clownino", aliases: ["fishinoclownino","fishino","clownino"], A: 15.5, B: 0.01, C: 10 },
            { name: "Fragrama and Chocrama", aliases: ["fragrama","fac","chocrama","fc"], A: 100, B: 0.01, C: 12 },
            { name: "Ginger Gerat", aliases: ["gingergerat","ginger","gg"], A: 140, B: 0.02, C: 30 },
            { name: "Headless Horseman", aliases: ["headless","hh","horseman","head"], A: 175, B: 0.25, C: 460 },
            { name: "Jolly Jolly Sahur", aliases: ["jollysahur","sahur","js"], A: 45, B: 0.01, C: 10 },
            { name: "Ketchuru and Musturu", aliases: ["ketchuruandmusturu","km","musturu","ketchuru"], A: 42.5, B: 0.02, C: 6.5 },
            { name: "Ketupat Kepat", aliases: ["ketupatkepat","kk","ketupat","kepat"], A: 35, B: 0.01, C: 4 },
            { name: "La Casa Boo", aliases: ["lacasa","lcb","boo","casa"], A: 100, B: 0.03, C: 14 },
            { name: "Dragon Gingerini", aliases: ["dragongingerini","gingerini","dg"], A: 300, B: 0.04, C: 100},
            // ===== CLÁSICOS =====
            { name: "Celularini Viciosini", aliases: ["celulariniviciosini","ccv","celular","vicio"], A: 22.5, B: 0.02, C: 2.5 },
            { name: "Chilin Chili", aliases: ["chillinchili","cc","chili","chill"], A: 25, B: 0.01, C: 5 },
            { name: "Chipso and Queso", aliases: ["chipsoandqueso","cq","chipso"], A: 25, B: 0.02, C: 3.5 },
            { name: "Cooki and Milki", aliases: ["cookiandmilki","cooki","milki","cam"], A: 155, B: 0.01, C: 25 },
            { name: "Dragon Cannelloni", aliases: ["dragoncannelloni","dc","dragon","drag"], A: 250, B: 0.04, C: 80 },

            // ===== GARAMA =====
            { name: "Garama and Madundung", aliases: ["garamaandmadundung","garama","madundung","gm"], A: 50, B: 0.03, C: 12 }
        ];

        const brainrot = brainrots.find(b => b.aliases.includes(alias));
        if (!brainrot) {
            return message.reply("❌ Brainrot no encontrado.");
        }

        const resultado = (M - brainrot.A) * brainrot.B + brainrot.C;

        // 💚 EMBED VERDE DINERO
        const embed = new EmbedBuilder()
            .setColor("#2ecc71")
            .setTitle("💰 Calculadora de Precios")
            .addFields(
                { name: "🧠 Brainrot", value: `**${brainrot.name}**` },
                { name: "📛 Alias usado", value: `\`${alias}\`` },
                { name: "💵 Resultado", value: `**$${resultado.toFixed(2)} USD**` }
            )
            .setFooter({ text: "Pauli Bot • Conversión automática" })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
