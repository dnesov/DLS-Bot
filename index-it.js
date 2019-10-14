const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const os = require('os')
const configFile = fs.readFileSync('config.txt', 'utf8');
const config = configFile
  .split(os.EOL)
  .map(line => line.split('='))
  .reduce((acc, val) => {
    const configName = val[0].trim()
    const configValue = val[1].trim()
    acc[configName] = configValue
    return acc
  }, {})
  const owner = config.ownerTag
  const prefix = config.prefix
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus("online")
  bot.user.setActivity(config.activity)
});

bot.on('message', message => {
    var args = message.content.substring(prefix.length).split(" ")

    switch (args[0]) {
        case "status":
        message.channel.send("Non aver paura che me ne sia andato - sto bene! A proposito, Pong! :ping_pong:");
        break;

        case "suggest":
        if((args.length > 1) && (message.channel.id == config.suggestionsSubmit)) {
            args.shift()
            var suggestion = args.join(" ")
            message.author.send(" Il tuo suggerimento ``" +suggestion+"`` è stato presentato a #configure-in-index.js votare.")
            var author = message.author.id
            message.delete()
            bot.channels.get(config.suggestions).send("``"+suggestion+"``"+" Inserito di: <@"+ author+">").then ((suggestionMessage) => {
                suggestionMessage.react("✅")
                suggestionMessage.react("❌")
                return;
            });
        } else {
            message.channel.send("Spiacenti, puoi suggerire solo su un canale specifico.")
        }
        break;

        case "ask":
        if((args.length > 1) && (message.channel.id == config.questionsSubmit)) {
            args.shift()
            var question = args.join(" ")
            message.author.send(" La tua domanda ``" +question+"`` è stato inviato a #questions per il personale.")
            var author = message.author.id
            message.delete()
            bot.channels.get(config.questions).send("``"+question+"``"+" Chiesto da: <@"+ author+">")
        } else {
            message.channel.send("Spiacenti, puoi chiedere solo su un canale specifico.")
        }
        break;

        case "send_suggestions_info":
        message.channel.send("**CIAO!**\n Abbiamo rielaborato il sistema dei suggerimenti. Ora, usa il <#468827218248859660> canale e digitare ?suggest ``il tuo suggerimento``. per presentare il tuo!\n Assicurati di non aver commesso errori di battitura, non ci piacciono gli errori grammaticali.\n In bocca al lupo!")
        break;
        
    }  
});

bot.login(config.clientToken);
