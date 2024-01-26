const Discord = require("discord.js")


module.exports = {
    
    name: "pourcentage",
    description: "🧮Calcule un pourcentage",
    permission: "Aucune",
    dm: false,
    category: "Utilitaire",
    options: [{

        type: "number",
        name: "prix",
        description: "Le prix ou la quantité",
        required: true,
        autocomplete: false
    
    },{
        type: "number",
        name: "pourcentage",
        description: "Le pourcentage",
        required: true,
        autocomplete: false
    }
    ],  
async run(message, args) {

    let prix = args.getNumber("prix")
    if(!prix) return message.reply("Veuillez renseigner un prix")

    
    let pourcentage = args.getNumber("pourcentage")
    if(!pourcentage) return message.reply("Veuillez renseigner un pourcentage")

if(pourcentage > 0 ) {

    let result = Math.round(prix * (1 + pourcentage/100))
    

    await message.reply(`Le résultat est de ${result}`)

} else if(pourcentage < 0) {

    let result =  prix * (1 + pourcentage/100)
    

    await message.reply(`Le résultat est de ${result}`)
}
}
}