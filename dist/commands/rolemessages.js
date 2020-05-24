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
exports.RoleMessagesCommand = void 0;
const EECSCommand_1 = require("../EECSCommand");
const discord_js_1 = require("discord.js");
class RoleMessagesCommand extends EECSCommand_1.default {
    constructor(client) {
        super(client, {
            name: 'rolemessages',
            group: 'mod',
            memberName: 'rolemessages',
            description: 'one time use',
            hidden: true,
            adminOnly: true,
        });
    }
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message.say(new discord_js_1.MessageEmbed({
                title: 'Status Flairs',
                description: '🚀: Prefrosh\n\n' +
                    '🛸: Not Berkeley\n\n' +
                    '✏️: Undergraduate\n\n' +
                    '💡: Graduate Student\n\n' +
                    '🎓: Alumni',
                color: 0xfdb515,
            }));
            yield message.say(new discord_js_1.MessageEmbed({
                title: 'View All Channels',
                description: '💻: Lower Division\n\n' + '🖥️: Upper Division',
                color: 0x003262,
            }));
            yield message.say(new discord_js_1.MessageEmbed({
                title: 'EECS Lower Division',
                color: 0xfdb515,
            }));
            yield message.say(new discord_js_1.MessageEmbed({
                title: 'CS Upper Division',
                color: 0x003262,
            }));
            return message.say(new discord_js_1.MessageEmbed({
                title: 'EE Upper Division',
                color: 0xfdb515,
            }));
        });
    }
}
exports.RoleMessagesCommand = RoleMessagesCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZW1lc3NhZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JvbGVtZXNzYWdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0M7QUFDeEMsMkNBQXlDO0FBR3pDLE1BQWEsbUJBQW9CLFNBQVEscUJBQVc7SUFDaEQsWUFBWSxNQUFzQjtRQUM5QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLGNBQWM7WUFDcEIsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsY0FBYztZQUMxQixXQUFXLEVBQUUsY0FBYztZQUMzQixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFSyxPQUFPLENBQUMsT0FBd0I7O1lBQ2xDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDYixJQUFJLHlCQUFZLENBQUM7Z0JBQ2IsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFdBQVcsRUFDUCxrQkFBa0I7b0JBQ2xCLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2QiwwQkFBMEI7b0JBQzFCLFlBQVk7Z0JBQ2hCLEtBQUssRUFBRSxRQUFRO2FBQ2xCLENBQUMsQ0FDTCxDQUFBO1lBQ0QsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNiLElBQUkseUJBQVksQ0FBQztnQkFDYixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixXQUFXLEVBQUUsd0JBQXdCLEdBQUcscUJBQXFCO2dCQUM3RCxLQUFLLEVBQUUsUUFBUTthQUNsQixDQUFDLENBQ0wsQ0FBQTtZQUNELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDYixJQUFJLHlCQUFZLENBQUM7Z0JBQ2IsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsS0FBSyxFQUFFLFFBQVE7YUFDbEIsQ0FBQyxDQUNMLENBQUE7WUFDRCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2IsSUFBSSx5QkFBWSxDQUFDO2dCQUNiLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLEtBQUssRUFBRSxRQUFRO2FBQ2xCLENBQUMsQ0FDTCxDQUFBO1lBQ0QsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNkLElBQUkseUJBQVksQ0FBQztnQkFDYixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixLQUFLLEVBQUUsUUFBUTthQUNsQixDQUFDLENBQ0wsQ0FBQTtRQUNMLENBQUM7S0FBQTtDQUNKO0FBbkRELGtEQW1EQyJ9