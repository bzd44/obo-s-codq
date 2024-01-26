const Discord = require("discord.js")
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async bot => {

    bot.db = await loadDatabase() //mise en place de la database pour le Warn
    bot.db.connect(function () {
        console.log("Base de données opérationnelle !")
    })

    await loadSlashCommands(bot)

    console.log(`${bot.user.tag} est bien en ligne !`)
}