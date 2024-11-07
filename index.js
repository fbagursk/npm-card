#!/usr/bin/env node
'use strict';

import chalk from 'chalk'
import boxen from 'boxen'
import clear from 'clear'
import inquirer from 'inquirer'
import Enquirer from 'enquirer'
import open from 'open'
import terminalImage from 'terminal-image';
import got from 'got';
import wait from 'wait';



clear()




const data = {
    name: chalk.bold.cyan("@fbagursk"),
    github: chalk.hex('#787878')("https://github.com/fbagursk"),
    npx: chalk.hex('#787878')("npx fbagursk"),
    email: chalk.hex('#787878')("fbagursk@bu.edu"),

    labelGithub: chalk.hex('#9E9E9E').bold("git:"),
    labelEmail: chalk.hex('#9E9E9E').bold("eml:"),
    labelCard: chalk.hex('#9E9E9E').bold("npm:"),

}


const card = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelGithub} ${data.github}`,
        `${data.labelCard} ${data.npx}`,
        `${data.labelEmail} ${data.email}`,
        ``,
        `${chalk.italic("no matter where you go")}`,
        `${chalk.bold("everyone's connected. ")}`,
    ].join("\n"),
    {
        margin:0,
        padding: {top: 1, bottom: 1, right:2, left:2},
        borderStyle: "double",
        borderColor: "white"
    }
)

const earphoneImg = await got( "https://github.com/fbagursk/npx-card/blob/main/assets/earphone.jpeg?raw=true").buffer();


const options = {
    type: "list",
    name: "actions",
    message: "select action",
    choices: [
        {
            name: '| whoami',
            value: async () => {                          
                console.log('Hi! My name is Felix Bagurskas Rubio.\nI am a full time Linux enjoyer and\npart-time Boston University sophomore.\nMy goal is to stop AI from taking over\nby merging my knowledge from Computer\nScience and Philosophy--the future of\nAI depends on the ethics of today.')
            }
        },
        {
            name: "| an earphone?",
            value: async () => {
                try {
                    console.log(await terminalImage.buffer(earphoneImg, {width:38}));
                } catch (err) {
                    console.log(err);
                }

                console.log("WARNING: DO NOT ACCEPT THE EARPHONE. ")
                console.log('HE CANNOT STOP TALKING ABOUT HIS MUSIC')
            
            let e = await Enquirer.prompt({
                type: "toggle",
                name: "earphone",
                message: "do you accept?\n",
                default: true
            })
            if (e.earphone == false) {
                console.log('\n"good choice..."')
                return ;
            }
            console.log('"hear what i hear...", he mumbles. ')
            await wait(500)
            
            console.log("it's too late to return it now, so")
            await wait(500)
            console.log('you reluctantly put the earphone in.')
            await wait(500)
            open("https://open.spotify.com/playlist/5rlv6LqW8LFtgWFF5E4Mw4?si=f4c35cc92feb45b6");


            }

        },
        '- exit'
    ]
}

function main() {
    console.log(card)
    inquirer.prompt(options).then(async answer => {
        if (answer.actions == "- exit") {
            return;
        }
        else {
            console.log('-'.repeat(38))
            await answer.actions();
            console.log('-'.repeat(38))

            Enquirer.prompt({
                type: "toggle",
                name: "again",
                message: "exit?", 
                default: false
            }).then(answer => {
                if (answer.again == false) {
                    clear()
                    main();
                }
            });
        }
    });
}

main();
