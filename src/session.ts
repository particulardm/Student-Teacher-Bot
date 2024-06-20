import { Bot, Context, SessionFlavor } from 'grammy';

interface SessionData {
    curStep: number;
    answers: string[];
}

export type MyContext = Context & SessionFlavor<SessionData>;

export function initial(): SessionData {
    return {
        curStep: 0,
        answers: []
    };
}

const questions = [
    'Are you a student or a teacher?',
    'What subject would you like to learn or teach?',
    'How old are you?'
]

export function askQuestions (ctx: MyContext, bot: Bot<MyContext>, targetChatID: string) {
let curStep = ctx.session.curStep;
    if (curStep < questions.length) {
        ctx.session.answers.push(ctx.message?.text || 'INCORRECT ANSWER FROM A USER');
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
    }