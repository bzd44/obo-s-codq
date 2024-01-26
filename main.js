const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/LoadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config")

    bot.commands = new Discord.Collection()
    bot.color = "#7D5F01";
    bot.function = {
        createId: require("./Fonctions/createID"),
        generateCaptcha: require("./Fonctions/generateCaptcha"),
        
    }

    bot.login(config.token)
    loadCommands(bot)
    loadEvents(bot)