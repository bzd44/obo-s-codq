const Discord = require("discord.js")

module.exports = {
    
    name: "ping",
    description: "Pong 🏓 la latence du bot.",
    permission: "Aucune",
    dm: true,
    category: "Information",

    async run(bot, message) {

       await message.reply(`Pong 🏓: \`${bot.ws.ping}\``)
    }
}