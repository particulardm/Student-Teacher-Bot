import { Bot } from 'grammy';
import * as dotenv from "dotenv";

dotenv.config();
const token = process.env.TOKEN || '';
console.log(token);
if (!token) throw new Error('Something is wrong with the token..');

const bot = new Bot(token);

bot.command('start', (ctx) => {
    ctx.reply('Hello!! I will try to connect you with a student or a tutor');
})

bot.on('message', (ctx) => {
    console.log('user has sent something...');
    ctx.reply('You are heard, but not understood yet');
})

bot.start();
console.log('should be running...');