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
GUILD_ID=[guild id]
VERIFIED_ROLE_NAME=[verified role name]
ADMIN_ROLE_NAME=[admin role name]
EMAIL_USER=[email]
EMAIL_PASS=[password]
```
where
* `[token]:` test Discord bot's token
* `[guild_id]:` your server's guild id
* `[verified role name]:` name of your server's verified role
* `[admin role name]:` name of your server's admin role
<br/>

Put something for EMAIL_USER and EMAIL_PASS even if you do not plan on using nodemailer.
