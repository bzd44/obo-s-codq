const Discord = require("discord.js")

module.exports = {
    
    name: "setcaptcha",
    description: "Paramètre le captcha",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "état",
            description: "Etat du captcha (on ou off)",
            required: true,
            autocomplete: true
        },{
            type: "channel",
            name: "salon",
            description: "Salon du captcha (renseigné si on)",
            required: false,
            autocomplete: false
        }
    ],
    
    async run(bot, message, args, db) {

            
            let etat = args.getString("état")
            if(etat !== "on" && etat !== "off") return message.reply("Indiquez ON ou OFF")

            if(etat === "off") {

                db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`)
                await message.reply("Le captcha est bien désactivé !")

            } else {

                let channel = args.getChannel("salon")
                if(!channel) return message.reply("Indique un salon pour activer le captcha !")
                channel = message.guild.channels.cache.get(channel.id)
                if(!channel) return message.reply("Ce salon n'existe pas !")
                    logs = message.guild.channels.cache.get(channel.id)
                    if(!logs) return message.reply("Ce salon n'existe pas !")
                    db.query(`UPDATE server SET logs = '${logs}' WHERE guild = '${message.guildId}`)
                

                db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`)
                await message.reply(`Le captcha est bien activé sur le salon ${channel} !`)

            }
    }
}