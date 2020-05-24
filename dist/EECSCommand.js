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
    constructor(client, info) {
        super(client, info);
        this.dmOnly = info.dmOnly;
        this.unverifiedOnly = info.unverifiedOnly;
        this.adminOnly = info.adminOnly;
        this.throttleTime = info.throttleTime;
        this.throttleMap = new Map();
    }
    run(message, args, fromPattern, result) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('\x1b[36m%s\x1b[0m', `${message.author.tag}: (${message.channel.type}) ${process.env.PREFIX + this.name} ${message.channel.type != 'dm' ? args : ''}`);
            const member = this.client.guilds.resolve(process.env.GUILD_ID).member(message.author);
            if (!member)
                return message.say('> Please join the EECS Discord server before using any commands.');
            if (this.dmOnly && message.channel.type != 'dm') {
                return message.say('> You can only use this command in a DM.');
            }
            if (this.unverifiedOnly && member.roles.cache.has(process.env.VERIFIED_ROLE_ID)) {
                return message.say(`> User ${message.author.tag} is already verified.`);
            }
            if (this.adminOnly &&
                !this.client.guilds.resolve(process.env.GUILD_ID).roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                return message.say('> You must be a server admin to use this command');
            }
            const now = Date.now();
            const cdTime = this.throttleTime * 1000;
            if (this.throttleMap.has(message.author.id)) {
                const expirationTime = this.throttleMap.get(message.author.id) + cdTime;
                if (now < expirationTime) {
                    const secondsLeft = (expirationTime - now) / 1000;
                    return message.direct(`> Please wait ${secondsLeft.toFixed(1)} seconds before reusing \`${this.name}\``);
                }
            }
            this.throttleMap.set(message.author.id, now);
            setTimeout(() => {
                this.throttleMap.delete(message.author.id);
                console.log('\x1b[32m%s\x1b[0m', `${message.author.tag}: ${process.env.PREFIX}${this.name} cd refreshed`);
            }, cdTime);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUVDU0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRUVDU0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2REFBb0g7QUFHcEg7O0dBRUc7QUFDSCxNQUFxQixXQUFZLFNBQVEsNkJBQU87SUFPNUMsWUFBWSxNQUFzQixFQUFFLElBQXFCO1FBQ3JELEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNoQyxDQUFDO0lBRUssR0FBRyxDQUNMLE9BQXdCLEVBQ3hCLElBQXFDLEVBQ3JDLFdBQW9CLEVBQ3BCLE1BQWdDOztZQUVoQyxPQUFPLENBQUMsR0FBRyxDQUNQLG1CQUFtQixFQUNuQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQzlFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUMxQyxFQUFFLENBQ0wsQ0FBQTtZQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENB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