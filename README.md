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
SHELL_GUILD_ID=[shell guild id]
VERIFIED_ROLE_ID=[verified role id]
ADMIN_ROLE_ID=[admin role id]
MESSAGE_ONE=[message id one]
MESSAGE_TWO=[message id two]
MESSAGE_THREE=[message id three]
MESSAGE_ALL=[message id viewall]
EMAIL_USER=[email]
EMAIL_PASS=[password]
```
[shell guild id] is for a shell server containing reaction emojis.
<br/>
[message id ...] are for the messages with role emojis. 
<br/>
[email] and [password] can be left blank if you are not working on verification.