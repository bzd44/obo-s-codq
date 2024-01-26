const Discord = require("discord.js")

module.exports = {
    
    name:"clear",
    description: "🧹Nettoie le salon.",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {

        type:"number",
        name: "nombre",
        description: "Le nombre de messages à supprimer",
        required: true,
        autocomplete: false

    }, {

        type: "channel",
        name: "salon",
        description: "Le salon où effacer les messages",
        required: false,
        autocomplete: false

    }
], 

async run(bot, message, args) {

    let channel = args.getChannel("salon")
    if(!channel) channel = message.channel;
    if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Il n'y a aucun salon à ce nom !")

    let number = args.getNumber("nombre")
    if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Le nombre doit de messages doit être inférieure ou égale à 100 !")

    try {

        let messages = await channel.bulkDelete(parseInt(number))

        await message.reply({content: `Les \`${messages.size}\` message(s) ont bien été supprimé dans le salon ${channel} !`, ephemeral: true})

    } catch (err) {

        let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createAt) >= 1209600000 ).values()]
        if(messages.length <=0) return message.reply(`Je n'ai pu supprimer aucun message dans le salon ${channel} ils datent tous de plus de 14 jours !`)
        await channel.bulkDelete(messages)

        await message.reply({content: `Je n'ai pas été capable de supprimer plus de \`${messages.length}\` message(s) dans le salon ${channel} car les autres sont trop vieux !`, ephemeral: true})
    }
}
}