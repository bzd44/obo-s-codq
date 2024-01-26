const Discord = require("discord.js")

module.exports = {
    
    name:"support",
    description: "🛠️ Serveur support !",
    permission: "Aucune",
    dm: true,
    category: "Information",

    async run(bot, message) {

       await message.reply(`Bonjour voici comme demandé mon serveur support!  https://discord.gg/RmGMh4SkEZ`) //envoie le lien d'invitation du serveur support.
    }
}