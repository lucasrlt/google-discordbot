var Discord = require("discord.js");
var logger = require("winston");
var auth = require("./auth.json");
var phrases = require("./phrases.json");

// Initialize logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

// Initialize Discord Bot
var bot = new Discord.Client();
bot.on("ready", function(evt) {
  logger.info("Bot connected.");
  bot.user.setActivity("trouver des réponses");
});

bot.on("message", function(msg) {
  // Don't reply to your messages you fool
  if (msg.author == bot.user) {
    return;
  }

  // The bot was tagged in the msg
  // Send a link with a google search to the question
  if (msg.content.includes(bot.user.toString())) {
    logger.info("Replying to: " + msg.content.toString());
    msg.channel.send(
      phrases[Math.floor(Math.random() * phrases.length)] +
        "\nhttps://www.google.com/search?q=" +
        encodeURIComponent(
          msg.content.toString().replace("<@" + bot.user.id + "> ", "")
        )
    );
  }
});

bot.login(auth.token);
