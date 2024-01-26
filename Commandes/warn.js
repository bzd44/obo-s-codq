const Discord = require("discord.js")

module.exports = {
    
    name:"warn",
    description: "🚧Warn un membre",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {

        type:"user",
        name: "membre",
        description: "Le membre à warn",
        required: true,
        autocomplete: false

    }, {

        type: "string",
        name: "raison",
        description: "La raison du warn",
        required: false,
        autocomplete: false

    }
], 

async run(bot, message, args, db) {

    let user = args.getUser("membre")
    if(!user) return message.reply("Pas de membres")
    let member = message.guild.members.cache.get(user.id)
    if(!member) return message.reply("Pas de membre")
    
    let reason = args.getString("raison")
    if(!reason) reason = "Pas de raison fournie.";

    if(message.user.id === user.id) return message.reply("Tu ne peux pas te warn toi-même !")
    if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peux pas warn le chef du serveur !")
    if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas warn cette personne !")
    if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("le bot ne peux pas wanr ce membre!")

    try { await user.send(`${message.user.tag} vous a warn sur le serveur ${message.guild.name} pour la raison : \`${reason}\``)} catch {err} {}
    
    await message.reply(`Vous avez warn ${user.tag} pour la raison : \`${reason}\``)

    let ID = await bot.function.createId("WARN")

    db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
}
}