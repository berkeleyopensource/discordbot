"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const client = new discord_js_commando_1.CommandoClient({ commandPrefix: process.env.PREFIX });
client.registry
    .registerGroups([
    ['mod', 'Moderation'],
    ['util', 'Utility'],
    ['fun', 'Fun'],
    ['misc', 'Miscellaneous']
])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));
client.once('ready', () => {
    console.log('\x1b[36m%s\x1b[0m', 'bot active!');
});
client.on('error', e => console.error(e));
client.on('warn', e => console.warn(e));
client.on('messageReactionAdd', (messageReaction, user) => {
    // TODO: y'all, i have no idea what the original code was supposed to do. i'll leave this to you guys :P
});
client.on('messageReactionRemove', (messageReaction, user) => {
    // TODO: y'all, i have no idea what the original code was supposed to do. i'll leave this to you guys :P
});
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUFvRDtBQUNwRCxpQ0FBZ0M7QUFDaEMsNkJBQTRCO0FBRTVCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVmLE1BQU0sTUFBTSxHQUFHLElBQUksb0NBQWMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFFeEUsTUFBTSxDQUFDLFFBQVE7S0FDVixjQUFjLENBQUM7SUFDWixDQUFDLEtBQUssRUFBRSxZQUFZLENBQUM7SUFDckIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO0lBQ25CLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUNkLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQztDQUM1QixDQUFDO0tBQ0QsZ0JBQWdCLEVBQUU7S0FDbEIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtBQUd6RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsQ0FBQTtBQUNuRCxDQUFDLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBRXZDLE1BQU0sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDdEQsd0dBQXdHO0FBQzVHLENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN6RCx3R0FBd0c7QUFDNUcsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUEifQ==