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
        case "ping":
        message.channel.send("Pong!");
        break;

        case "suggest":
        if((args.length > 1) && (message.channel.id == config.suggestionsSubmit)) {
            args.shift()
            var suggestion = args.join(" ")
            message.author.send(" Your suggestion ``" +suggestion+"`` has been submitted to #suggestions to vote.")
            var author = message.author.id
            message.delete()
            bot.channels.get(config.suggestions).send("``"+suggestion+"``"+" Submitted by: <@"+ author+">").then ((suggestionMessage) => {
                suggestionMessage.react("✅")
                suggestionMessage.react("❌")
                return;
            });
        } else {
            message.channel.send("Sorry, you can suggest only on a specific channel.")
        }
        break;

        case "ask":
        if((args.length > 1) && (message.channel.id == config.questionsSubmit)) {
            args.shift()
            var question = args.join(" ")
            message.author.send(" Your question ``" +question+"`` has been submitted to #questions for staff.")
            var author = message.author.id
            message.delete()
            bot.channels.get(config.questions).send("``"+question+"``"+" Asked by: <@"+ author+">")
        } else {
            message.channel.send("Sorry, you can ask only on a specific channel.")
        }
        break;

        case "send_suggestions_info":
        message.channel.send("**HELLO THERE!**\n We have reworked the suggestions system. Now, use the <#468827218248859660> channel, and type ?suggest ``your suggestion``. in order to submit your own!\n Make sure you didn't make any typos, we don't like grammatical errors.\n Good luck!")
        break;
        
    }  
});

bot.login(config.clientToken);