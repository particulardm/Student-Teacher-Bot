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

function initial(): SessionData {
    return { curStep: 0,
             answers: []
            };
  }
  bot.use(session({ initial }));

const questions = [
    'Are you a student or a teacher?',
    'What subject would you like to learn or teach?',
    'How old are you?'
]

bot.command('start', (ctx) => {
    ctx.reply('Hello!! Here we connect those willing to teach and willing to learn. Tell me, are you a student or a teacher?');
})

bot.on('message', (ctx) => {
    let curStep = ctx.session.curStep;
    if (curStep < questions.length) {
        ctx.session.answers.push(ctx.message.text || 'INCORRECT ANSWER FROM A USER');
        ctx.session.curStep++;
        if (ctx.session.curStep < questions.length) {
            ctx.reply(questions[ctx.session.curStep]);
        }
        else {
            ctx.reply('Thank you for your answers!! Updating the dashboard..');
            const answers = ctx.session.answers;
            bot.api.sendMessage(targetChatID, `${answers[0]}, ${answers[1]}, ${answers[2]}`);
            ctx.session.curStep = 0;
            ctx.session.answers = [];
        }
    }
})

bot.start();
console.log('should be running...');