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
exports.sendCode = exports.verifyCode = void 0;
const nodemailer = require("nodemailer");
let codes = {};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
    },
});
function verifyCode(user, code) {
    if (codes[user.id] == code) {
        delete codes[user.id];
        return true;
    }
    return false;
}
exports.verifyCode = verifyCode;
/**
 * Generates, stores, and sends a verification code to the email
 *
 * @returns whether the send was successful
 */
function sendCode(user, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let code = new Date().getTime() % 1000000;
        code = code < 1000000 ? code + 1000000 : code;
        try {
            yield transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'EECS Discord Verification Code',
                text: `Please use the code ${code} to complete your verification.\nThis code will expire in five minutes.`,
            });
            codes[user.id] = code;
            setTimeout(() => {
                if (codes[user.id] == code) {
                    delete codes[user.id];
                    console.log(`User ${user.tag} deleted from queue`);
                }
            }, 5 * 60 * 1000);
            console.log(`Code successfully sent to ${user.tag}`);
            return true;
        }
        catch (error) {
            console.log(`Code failed to send to ${user.tag}`);
            return false;
        }
    });
}
exports.sendCode = sendCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ZlcmlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFHeEMsSUFBSSxLQUFLLEdBQThCLEVBQUUsQ0FBQTtBQUV6QyxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDO0lBQzNDLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFO1FBQ2xDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFO0tBQ3JDO0NBQ0osQ0FBQyxDQUFBO0FBRUYsU0FBZ0IsVUFBVSxDQUFDLElBQVUsRUFBRSxJQUFZO0lBQy9DLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUU7UUFDeEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3JCLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDO0FBTkQsZ0NBTUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBc0IsUUFBUSxDQUFDLElBQVUsRUFBRSxLQUFhOztRQUNwRCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtRQUN6QyxJQUFJLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1FBRTdDLElBQUk7WUFDQSxNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7Z0JBQzVCLEVBQUUsRUFBRSxLQUFLO2dCQUNULE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLElBQUksRUFBRSx1QkFBdUIsSUFBSSx5RUFBeUU7YUFDN0csQ0FBQyxDQUFBO1lBQ0YsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO29CQUN4QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBO2lCQUNyRDtZQUNMLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO1lBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBRXBELE9BQU8sSUFBSSxDQUFBO1NBQ2Q7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELE9BQU8sS0FBSyxDQUFBO1NBQ2Y7SUFDTCxDQUFDO0NBQUE7QUExQkQsNEJBMEJDIn0=