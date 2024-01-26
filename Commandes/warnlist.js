const Discord = require("discord.js")

module.exports = {
    
    name: "warnlist",
    description: "🗒️Affiche les différents warns d'un malveillant",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le malveillant",
            required: true,
            autocomplete: false 
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if (!user) return message.reply("Il n'y a aucun membre !")
        let member = args.getUser("membre")
        if (!member) return message.reply("Il n'y a aucun membre !")

        db.query(`SELECT * FROM warns WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            if(req.length < 1) return message.reply("Ce membre n'a pas encore de warns !")
            await req.sort((a, b) => parseInt(b.date) - parseInt(a.date));

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({name: `Obo's Family`})
            .setTitle(`Warns de ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            

            for(let i = 0; i < req.length; i++) {

                Embed.addFields([{name:`Warn n°${i+1}`, value: `> **Auteur** : ${(await bot.users.fetch(req[i].author)).tag}\n> **ID** : \`${req[i].warn}\`\n> **Raison** : \`${req[i].reason}\`\n> **Date** : <t:${Math.floor(parseInt(req[i].date) / 1000)}:F>`}])
            }

            await message.reply({embeds: [Embed]})
        })    
    
    }
}