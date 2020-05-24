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
exports.ClassToRoleCommand = void 0;
const EECSCommand_1 = require("../EECSCommand");
const classMappings_1 = require("../classMappings");
class ClassToRoleCommand extends EECSCommand_1.default {
    constructor(client) {
        super(client, {
            name: 'rolereactions',
            group: 'mod',
            memberName: 'rolereactions',
            description: 'one time use',
            hidden: true,
            adminOnly: true,
        });
    }
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const SHELLGUILD = this.client.guilds.resolve(process.env.SHELL_GUILD_ID);
            function addReactions(messageID, name, mappings, shell) {
                return __awaiter(this, void 0, void 0, function* () {
                    const targetMessage = yield message.channel.messages.fetch(messageID);
                    const rawComparator = (a, b) => {
                        function raw(s) {
                            return s.replace(/[a-z_]/, '');
                        }
                        return parseInt(raw(a)) - parseInt(raw(b));
                    };
                    for (let emojiName of Object.keys(mappings).sort(rawComparator)) {
                        try {
                            if (shell) {
                                const emoji = SHELLGUILD.emojis.cache.find(emoji => emoji.name === emojiName);
                                yield targetMessage.react(emoji.id);
                            }
                            else {
                                targetMessage.react(emojiName);
                            }
                        }
                        catch (error) {
                            console.log(`Emoji needed for ${emojiName} (${name})`);
                        }
                    }
                });
            }
            yield Promise.all([
                addReactions(process.env.MESSAGE_STATUS, 'Status', classMappings_1.default.STATUS, false),
                addReactions(process.env.MESSAGE_ALL, 'Lower/Upper Division View', classMappings_1.default.VIEW, false),
                addReactions(process.env.MESSAGE_EECS_LD, 'EECS Lower Division', classMappings_1.default.LD, true),
                addReactions(process.env.MESSAGE_CS_UD, 'CS Upper Division', classMappings_1.default.CSUD, true),
                addReactions(process.env.MESSAGE_EE_UD, 'EE Upper Division', classMappings_1.default.EEUD, true),
            ]);
            return message.direct('Role Reactions Complete');
        });
    }
}
exports.ClassToRoleCommand = ClassToRoleCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXJlYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yb2xlcmVhY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QztBQUV4QyxvREFBNEM7QUFFNUMsTUFBYSxrQkFBbUIsU0FBUSxxQkFBVztJQUMvQyxZQUFZLE1BQXNCO1FBQzlCLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDVixJQUFJLEVBQUUsZUFBZTtZQUNyQixLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxlQUFlO1lBQzNCLFdBQVcsRUFBRSxjQUFjO1lBQzNCLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVLLE9BQU8sQ0FBQyxPQUF3Qjs7WUFDbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDekUsU0FBZSxZQUFZLENBQUMsU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBYSxFQUFFLEtBQWM7O29CQUN0RixNQUFNLGFBQWEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDckUsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLEVBQUU7d0JBQzNDLFNBQVMsR0FBRyxDQUFDLENBQVM7NEJBQ2xCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7d0JBQ2xDLENBQUM7d0JBQ0QsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUM5QyxDQUFDLENBQUE7b0JBQ0QsS0FBSyxJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTt3QkFDN0QsSUFBSTs0QkFDQSxJQUFJLEtBQUssRUFBRTtnQ0FDUCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFBO2dDQUM3RSxNQUFNLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBOzZCQUN0QztpQ0FBTTtnQ0FDSCxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBOzZCQUNqQzt5QkFDSjt3QkFBQyxPQUFPLEtBQUssRUFBRTs0QkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixTQUFTLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQTt5QkFDekQ7cUJBQ0o7Z0JBQ0wsQ0FBQzthQUFBO1lBQ0QsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNkLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsdUJBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUMvRSxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsMkJBQTJCLEVBQUUsdUJBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO2dCQUM3RixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUUsdUJBQWEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDO2dCQUN4RixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsdUJBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUN0RixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsdUJBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3pGLENBQUMsQ0FBQTtZQUNGLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3BELENBQUM7S0FBQTtDQUNKO0FBNUNELGdEQTRDQyJ9