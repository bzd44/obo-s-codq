const Discord = require("discord.js")

module.exports = {
    
    name: "ban",
    description: "🔨Ban un membre du seveur",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "L'heureux élu",
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

        try {
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Il n'y a aucun membre à bannir !")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison n'a été renseignée !"
            
            if(message.user.id === user.id) return message.reply("Tu ne peux pas te bannir toi-même !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peux pas bannir le dirigeant du serveur !")
            if(member && !member?.bannable) return message.reply("Je ne suis pas en capacité de bannir ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir cette personne !")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre a déjà été banni !")
            
            try {await user.send(`Bonjour ${user.tag}, tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\` `)} catch(error) {}

            await message.reply(`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (error) {
            
            return message.reply("Cette utilisateur n'existe pas, vérifiez et réessayez !")
        }
    }
}