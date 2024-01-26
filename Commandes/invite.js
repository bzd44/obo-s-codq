const Discord = require("discord.js")

module.exports = {
    
    name: "invite",
    description: "✉️Invite le bot sur ton serveur !",
    permission: "Aucune",
    dm: true,
    category: "Information",

    async run(bot, message) {

        await message.reply(`Il suffit juste de cliquer sur mon profil dans la liste des membres !`)
    }
}