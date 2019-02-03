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
  console.log(`Zalogowano jako ${bot.user.tag}! Autor: dnesov; Polska wersja bota: kotyk`);
  bot.user.setStatus("online")
  bot.user.setActivity(config.activity)
});

bot.on('message', message => {
    var args = message.content.substring(prefix.length).split(" ")

    switch (args[0]) {
        case "status":
        message.channel.send("Odpowiadam, jak zawsze na naszych falach!");
        break;

        case "sugestie":
        if((args.length > 1) && (message.channel.id == config.suggestionsSubmit)) {
            args.shift()
            var suggestion = args.join(" ")
            message.author.send(" Twoja sugestia ``" +suggestion+"`` została przyjęta do kanału #propozycje-sugestie aby o nią zagłosować.")
            var author = message.author.id
            message.delete()
            bot.channels.get(config.suggestions).send("``"+suggestion+"``"+" Zasugerowane przez: <@"+ author+">").then ((suggestionMessage) => {
                suggestionMessage.react("✅")
                suggestionMessage.react("❌")
                return;
            });
        } else {
            message.channel.send("Sorki, ale możesz tylko dawać sugestie na odpowiednich kanałach..")
        }
        break;

        case "ask":
        if((args.length > 1) && (message.channel.id == config.questionsSubmit)) {
            args.shift()
            var question = args.join(" ")
            message.author.send(" Twoje pytanie ``" +question+"`` zostało dodane do kanału #questions dla odpowiedzi Administracji.")
            var author = message.author.id
            message.delete()
            bot.channels.get(config.questions).send("``"+question+"``"+" Zapytane przez: <@"+ author+">")
        } else {
            message.channel.send("Sorki, ale możesz tylko pytać na odpowiednich kanałach..")
        }
        break;

        case "info":
        message.channel.send("**Cześć!**\n Jak widzisz, przerobiliśmy cały system propozycji. Od teraz by dodać sugestie na temat serwera, wpisz -configureme <treść>.\nBy zapytać o coś, po prostu napisz -configureme <treść>")
        break;
        
    }  
});

bot.login(config.clientToken);
