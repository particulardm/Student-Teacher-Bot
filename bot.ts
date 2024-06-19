import { Bot, Context, session, SessionFlavor } from 'grammy';
import * as dotenv from "dotenv";

dotenv.config();
const token = process.env.TOKEN || '';
const targetChatID = process.env.TARGET_CHAT_ID || '';

interface SessionData {
    curStep: number;
    answers: string[];
}

type MyContext = Context & SessionFlavor<SessionData>;

const bot = new Bot<MyContext>(token);

const questions = [
    'Are you a student or a teacher?',
    'What subject would you like to learn or teach?',
    'How old are you?'
]

bot.command('start', (ctx) => {
    ctx.reply('Hello!! Here we connect those willing to teach and willing to learn. Type /go to start');
})

bot.on('message', (ctx) => {
    // console.log(ctx.chat.id);
    bot.api.sendMessage(targetChatID, 'WORKS HUH??');
    // ctx.reply('You are heard, but not understood yet');
})

bot.start();
console.log('should be running...');