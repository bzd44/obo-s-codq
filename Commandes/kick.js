const Discord = require("discord.js")

module.exports = {
    
    name: "kick",
    description: "🦶kick un membre du seveur",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "La personne à kick",
            required: true,
            autocomplete: false
        },{
            type: "string",
            name: "raison",
            description: "Le motif de la sanction",
            required: false,
            autocomplete: false
        }
    ],
    
    async run(bot, message, args) {

        
        let user = args.getUser("membre")
        if(!user) return message.reply("Il n'y a pas d'utilisateur à kick !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Le membre que vous voulez kick n'est pas présent sur le serveur !")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison donnée par le modérateur !";
            
        if(message.user.id === user.id) return message.reply("Tu ne peux pas te kick toi-même !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peux pas exclure le dirigeant du serveur")
        if(member && !member?.kickable) return message.reply("Je n'ai pas les capacités requises pour faire cela !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas kick ton supérieur !")
            
            
        try {await user.send(`Bonjour ${user.tag}, tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\` `)} catch(error) {}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

        await member.kick(reason)

    }
}