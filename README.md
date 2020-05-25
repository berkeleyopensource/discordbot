# discordbot
Discord Bot for the Berkeley EECS Discord server

To run a version of the bot locally for development, make a [Discord application](https://discord.com/developers/applications), navigate to the settings, and turn it into a bot.
<br/>
Use [Discord permissions calculator](https://discordapi.com/permissions.html) in conjunction with the test bot's client id to invite it to your server.
<br/>

Before running, configure the test bot by adding an .env file with the following contents:
```
PREFIX=>
TOKEN=[token]
EMAIL_USER=[email]
EMAIL_PASS=[password]
```
where [token] is a token to your own test Discord bot.
<br/>

Put something for EMAIL_USER and EMAIL_PASS even if you do not plan on using nodemailer.