# discordbot
Discord Bot for the Berkeley EECS Discord server

To run a version of the bot locally for development, make a [Discord application](https://discord.com/developers/applications), navigate to the settings, and turn it into a bot.
<br/>
Use [Discord permissions calculator](https://discordapi.com/permissions.html) in conjunction with the test bot's client id to invite it to your server.
<br/>

Before running, add a .env file with the following contents:
```
PREFIX=>
TOKEN=[token]
GUILD_ID=[guild id]
VERIFIED_ROLE_ID=[verified role id]
ADMIN_ROLE_ID=[admin role id]
EMAIL_USER=[email]
EMAIL_PASS=[password]
```
Put something for EMAIL_USER and EMAIL_PASS even if you do not plan on using nodemailer.