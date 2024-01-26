const Discord = require("discord.js")
const axios = require("axios")

module.exports = {
    
    name:"pokemon",
    description: "🎲Choisit un pokémon au hasard dans le pokedex",
    permission: "Aucune",
    dm: false,
    category: "Divertissement",

    async run (bot, message) {
        try {
          
           let response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
           let pokemons = response.data.results
           let randomIndex = Math.floor(Math.random() * pokemons.length) 
           let randomPokemon = pokemons[randomIndex];
           let pokemonResponse = await axios.get(randomPokemon.url)
    
          
           let pokemonName = pokemonResponse.data.name
           let pokemonImage = pokemonResponse.data.sprites.front_default
        
          
            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Un Pokémon a été choisi au hasard : ${pokemonName}`)
            .setImage(pokemonImage);
            await message.reply({embeds: [Embed]})

            } catch (error) {

              return message.reply(`Une erreur est survenue lors de la récupération du pokémon.`)

            }
    }
  }