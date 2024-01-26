const Discord = require("discord.js");

module.exports = {
    name: "credits",
    description: "💻 Affiche les crédits du bot",
    permission: "Aucune",
    dm: true,
    category: "Information",

    async run(bot, message) {

        let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle("Obo's Credit")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .addFields({ name: `**Obo:** :`, value: "*Obo est un bot créé et développé par [Little_Dream] qui vous permet de modérer et de vous amuser sur vos serveurs !*" })
            .addFields({ name: `**Développeurs** :`, value: `[Little_Dream](https://heylink.me/8ZD/) -> ***Bot*** & ***Dashboard *** \n [Watermelon](https://www.instagram.com/camille.bdn___/) -> ***Bot***` })
            .addFields({ name: '**Inspirations** :', value: '[Mad Rage (on youtube)](https://www.youtube.com/channel/UCY1tjA5jQM8tK6ArgjNE5HQ) \n [Probot](https://probot.io/invite) \n [Draftbot](https://discord.com/oauth2/authorize?client_id=318312854816161792&scope=bot+applications.commands&permissions=2113400319)' })
            .addFields({ name: '**Thanks to** :', value: 'Developpeurs 💻\n Tous les Donateurs ✨ \n Tous les traducteurs 🔁 \n Tous les staffs 🛠️\n [Watemelon](https://www.instagram.com/camille.bdn___/) \n [Tatissou(bêta testeur)](https://www.instagram.com/math_is_pleasant/) ' })
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1099319391809716274&permissions=8&scope=bot%20applications.commands");

        await message.reply({ embeds: [Embed] });
    }
};