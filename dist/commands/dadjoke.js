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
exports.DadJokeCommand = void 0;
const EECSCommand_1 = require("../EECSCommand");
const node_fetch_1 = require("node-fetch");
class DadJokeCommand extends EECSCommand_1.default {
    constructor(client) {
        super(client, {
            name: 'dadjoke',
            group: 'fun',
            memberName: 'dadjoke',
            description: 'gets a random dadjoke',
            throttleTime: 3,
        });
    }
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const j = yield node_fetch_1.default('https://icanhazdadjoke.com/', {
                    headers: { Accept: 'text/plain' },
                });
                return message.say(yield j.text());
            }
            catch (error) {
                console.log(error);
                return message.say('> Error querying dad joke :(');
            }
        });
    }
}
exports.DadJokeCommand = DadJokeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFkam9rZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kYWRqb2tlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QztBQUV4QywyQ0FBOEI7QUFFOUIsTUFBYSxjQUFlLFNBQVEscUJBQVc7SUFDM0MsWUFBWSxNQUFzQjtRQUM5QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsWUFBWSxFQUFFLENBQUM7U0FDbEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVLLE9BQU8sQ0FBQyxPQUF3Qjs7WUFDbEMsSUFBSTtnQkFDQSxNQUFNLENBQUMsR0FBRyxNQUFNLG9CQUFLLENBQUMsNkJBQTZCLEVBQUU7b0JBQ2pELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUU7aUJBQ3BDLENBQUMsQ0FBQTtnQkFDRixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTthQUNyQztZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2xCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO2FBQ3JEO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUF0QkQsd0NBc0JDIn0=