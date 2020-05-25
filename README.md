# discordbot
Discord Bot for the Berkeley EECS Discord server

To run a version of the bot locally for development, make a [Discord application](https://discord.com/developers/applications) and navigate to the settings in order to turn it into a bot.
<br/>
Use a [Discord permissions calculator](https://discordapi.com/permissions.html) in conjunction with the test bot's client id to invite it to your server.
<br/>

In order to configure the test bot, add an .env file with the contents:
```
PREFIX=>
TOKEN=[token]
EMAIL_USER=[email]
EMAIL_PASS=[password]
```
where [token] is a token to your own test Discord bot.
<br/>

Put something for EMAIL_USER and EMAIL_PASS even if you do not plan on using nodemailer.