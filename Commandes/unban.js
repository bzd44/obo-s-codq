const Discord = require("discord.js")

module.exports = {
    
    name: "unban",
    description: "🚪Unban un membre du seveur",
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
            description: "Le motif de la non-sanction",
            required: false,
            autocomplete: false
        }
    ],
    
    async run(bot, message, args) {

         try {

            let user = args.getUser("membre")
            if(!user) return message.reply("Pas d'utilisateur !")

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie par le modérateur.";

            if((await message.guild.bans.fetch(user.id).size <= 0)) return message.reply("Cet utilisateur n'est pas banni !")

            try {await user.send(`Tu as été unban par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}

            await message.reply(`${message.user} a unban ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.members.unban(user, reason)


    
        }catch (err) {

            return message.reply("Auncun utilisateur trouvé.")
        }
     }
}