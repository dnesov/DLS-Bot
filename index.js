const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const prefix = "+"
const dnesov = "dnesov.js#9358"

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus("online")
  bot.user.setGame("Viewing your suggestions... | use +suggest to suggest one!")
});

bot.on('message', message => {
    var args = message.content.substring(prefix.length).split(" ")

    switch (args[0]) {
        case "ping":
        message.channel.send("Pong!");
        break;

        case "suggest":
        if((args.length > 1) && (message.channel.id == "468827218248859660")) {
            args.shift()
            var suggestion = args.join(" ")
            message.author.send(" Your suggestion ``" +suggestion+"`` has been submitted to #suggestions to vote.")
            var author = message.author.id
            message.delete()
            bot.channels.get("459332614155927552").send("``"+suggestion+"``"+" Submitted by: <@"+ author+">").then ((suggestionMessage) => {
                suggestionMessage.react("✅")
                suggestionMessage.react("❌")
                return;
            });
        } else {
            message.channel.send("Sorry, you can suggest only on a specific channel.")
        }
        break;

        case "send_suggestions_info":
        message.channel.send("**HELLO THERE!**\n We have reworked the suggestions system. Now, use the <#468827218248859660> channel, and type ?suggest ``your suggestion``. in order to submit your own!\n Make sure you didn't make any typos, we don't like grammatical errors.\n Good luck!")
        break;
        
    }  
});

bot.login('NDY4ODE0NTU0MTc3MjA4MzMw.Di-pVA.xB7GyZP98t9VhAIjufD_0VAQDyE');