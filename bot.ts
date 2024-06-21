import { Bot, session } from 'grammy';
import { MyContext, initial, askQuestions, handleCallbackQuery } from './src/session'
import * as dotenv from "dotenv";

dotenv.config();
const token = process.env.TOKEN || '';
const targetChatID = process.env.TARGET_CHAT_ID || '';

const bot = new Bot<MyContext>(token);
bot.use(session({ initial }));

bot.command('start', (ctx) => {
    ctx.reply('Hello!! Here we connect those willing to teach and willing to learn. Tell me, are you a student or a teacher?');
})

bot.on('message', (ctx) => {
    askQuestions(ctx, bot, targetChatID);
})

bot.on('callback_query:data', (ctx) => {
    handleCallbackQuery(ctx, bot);
});

bot.start();
console.log('should be running...');