"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
/**
 * The default Commando command, but with some server specific features added. Use `execute()` instead of run in commands that extend this.
 */
class EECSCommand extends discord_js_commando_1.Command {
    /**
     * @param {Commando.CommandoClient} client
     * @param {object} info the same as Commando.CommandInfo but with three extra optional parameters: `unverifiedOnly`, `adminOnly`, and `dmOnly`
     */
    constructor(client, info) {
        super(client, info);
        this.dmOnly = info.dmOnly;
        this.unverifiedOnly = info.unverifiedOnly;
        this.adminOnly = info.adminOnly;
    }
    run(message, args, fromPattern, result) {
        return __awaiter(this, void 0, void 0, function* () {
            let member = this.client.guilds.resolve(process.env.GUILD_ID).member(message.author);
            if (!member)
                return message.say('> Please join the EECS Discord server before using any commands.');
            if (this.dmOnly && message.channel.type != 'dm') {
                return message.say('> You can only use this command in a DM.');
            }
            if (this.unverifiedOnly && member.roles.cache.has(process.env.VERIFIED_ROLE_ID)) {
                return message.say(`> User ${message.author.tag} is already verified.`);
            }
            if (this.adminOnly && !this.client.guilds.resolve(process.env.GUILD_ID).roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                return message.say('> You must be a server admin to use this command');
            }
            return this.execute(message, args, fromPattern, result);
        });
    }
    /**
     * The normal `Command.run()` method but with a few custom checks
     */
    execute(message, args, fromPattern, result) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`${this.constructor.name} doesn't have a run() method.`);
        });
    }
}
exports.default = EECSCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUVDU0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRUVDU0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2REFBb0g7QUFHcEg7O0dBRUc7QUFDSCxNQUFxQixXQUFZLFNBQVEsNkJBQU87SUFLNUM7OztPQUdHO0lBQ0gsWUFBWSxNQUFzQixFQUFFLElBQXFCO1FBQ3JELEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDbkMsQ0FBQztJQUVLLEdBQUcsQ0FBQyxPQUF3QixFQUFFLElBQXFDLEVBQUUsV0FBb0IsRUFBRSxNQUFnQzs7WUFDN0gsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNwRixJQUFJLENBQUMsTUFBTTtnQkFDUCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0VBQWtFLENBQUMsQ0FBQTtZQUUxRixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUM3QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQTthQUNqRTtZQUVELElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUM3RSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsdUJBQXVCLENBQUMsQ0FBQTthQUMxRTtZQUVELElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQ2hILE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO2FBQ3pFO1lBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzNELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csT0FBTyxDQUFDLE9BQXdCLEVBQUUsSUFBcUMsRUFBRSxXQUFvQixFQUFFLE1BQWdDOztZQUN2SSxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLCtCQUErQixDQUFDLENBQUE7UUFDekUsQ0FBQztLQUFBO0NBQ0Q7QUExQ0QsOEJBMENDIn0=