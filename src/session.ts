import { Bot, Context, SessionFlavor, InlineKeyboard } from 'grammy';

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
            ctx.reply("Thank you for your answers!! We will add them to the public dashboard after the moderator's approval.");
            const answers = ctx.session.answers;
            const answersUserID = ctx.chat?.id;
            const keyboard = new InlineKeyboard()
                    .text("Approve", `approve:${answersUserID}`)
                    .text("Discard", `discard:${answersUserID}`);
            bot.api.sendMessage(targetChatID, `${answers[0]}, ${answers[1]}, ${answers[2]}`);
            bot.api.sendMessage(targetChatID, "Please approve or discard the answers:", { reply_markup: keyboard });
            ctx.session.curStep = 0;
            ctx.session.answers = [];
        }
    }
    }

    export function handleCallbackQuery(ctx: MyContext, bot: Bot<MyContext>) {
        if (ctx.update.callback_query?.data !== undefined) {
            const data: string[] = ctx.update.callback_query.data.split(':');
            const action = data[0];
            const answersUserID = data[1];
    
            if (action === "approve") {
                ctx.reply("The application approved, then. Adding them to the dashboard...");
                bot.api.sendMessage(answersUserID, "Update: Congratulations!! Your application have been approved")
            } else if (action === "discard") {
                ctx.reply("You've discarded this user's answers.");
                bot.api.sendMessage(answersUserID, "Update: Your application have been discarded by a moderator. You can try again.")
            }
        }
    }