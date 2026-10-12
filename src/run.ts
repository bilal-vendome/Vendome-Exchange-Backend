import OpenAI from "openai";
import readline from 'node:readline';
import chalk from 'chalk';
const { execSync } = require('child_process');

function typeWritting(rl: any) {
    let countdown = 0;
    function startCountdown() {
        setInterval(() => {
            countdown += 1000;
        }, 1000);
    }

    startCountdown();
    rl.question('Start Typing...', (answer: string) => {
        const prompt = answer;
        const parse = prompt.split(" ");
        const total = parse.length;
        if (parse.length === 1 && parse[0] === '') {
            console.log("Invalid Prompt.");
        }
        else {
            const time = countdown;
            console.log(`Hey Dear, you just typped ${total} ${total > 1 ? 'words' : 'word'} only in ${time}.`);
        }

        rl.question("Do you want to save the histy of this chat? Type `yes` or `y` ", (value: string) => {
            if (value.toLocaleLowerCase() === "yes" || value.toLocaleLowerCase() === "y") {
                for (let i = 0; i < parse.length; i++) {
                    console.log(i + 1 + " " + parse[i]);
                }
                console.log(`Here is the history of the above chat!`);
                rl.close();
                console.log(`Chat has Ended!`);
            }
            else {
                rl.close();
                run();
            }
        })
    });
}

const history: any = [
    { role: "system", content: "You are an AI assistant." }
];

async function startChatting(prompt: string, rl: any) {
    if (prompt.trim().toLocaleLowerCase() === "close") {
        endChatting(rl);
    } else {
        const openai = new OpenAI();
        try {
            const context = history.slice(-10);

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    ...context,
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
            });

            const content = response.choices[0].message.content;
            // console.log({content});

            history.push({ role: "user", content: prompt });
            history.push({ role: "assistant", content });

            return content;
        } catch (error) {
            console.error("Something went wrong while communicating with server:", error);
        }
    }
}

function askUser(rl: any) {
    rl.question("Type something: ", async (prompt: string) => {
        const response = await startChatting(prompt, rl);
        console.log(chalk.red.bold(response));
        askUser(rl);
    });
}

async function endChatting(rl: any) {
execSync("clear", { stdio: "inherit" });
    process.exit(1);
}

function chatWithLLM(rl: any) {
    rl.question("Type `yes or y` if you want to continue chat with LLM (AI).", (answer: string) => {
        const value = answer.trim().toLocaleLowerCase();
        if (value === "yes" || value === "y") {
            askUser(rl);
        } else {
            console.log("User dont wants to continue CHAT!");
            endChatting(rl);
        }
    })
}

export const run = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // typeWritting(rl);
    chatWithLLM(rl);
};


// ab hamein aik aesa sytem bananan hai jis mein more than one ai models houngai and wo apse mein conversation kr rahy houngai and user just dhek raha hoga mtlb wo apas mein he baatein kr rahy houngai and user mazy le raha hoga
