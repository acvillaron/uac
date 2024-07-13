import inquirer from 'inquirer';
import {getTypes, getGuide, getTargets} from './services/queries.mjs'
import {database} from './database.mjs';
import { 
    Wizard,
    OSQuestion, 
    nextQuestion,
    TypeMethodQuestion,
    BinariesVulnerables,
    nextOrLeaveQuestion,
    openAPIQuestion,
    MENU_SALIR,
    MENU_OS,
    MENU_BINARIO,
    MENU_TECNICA
} from './wizzard.mjs';
import {buildtext} from './banner.mjs';
import dotenv from 'dotenv';
dotenv.config();
import { IaPrompt } from './services/ia.mjs';
const answers = {
    os:null,
    type:null,
    binary:null,
}

const OS = async () => {
    const {os, type, binary} = answers;
    if(os || type || binary) Wizard.at(0).message = 'Elija el siguiente filtro'
    const responseWizard =await inquirer.prompt(Wizard);
    if(responseWizard.option.includes(MENU_SALIR)){
        return database.end();
    }
    await RunQuesions(responseWizard.option)
}

const RunQuesions = async (option) => {
    const getTargetsDB = await getTargets();
    const getTypesDB = await getTypes();
    switch (option) {
        case MENU_OS:
            const responseOS =await inquirer.prompt(OSQuestion);
            answers.os = responseOS;
            break;
        case MENU_BINARIO:
            BinariesVulnerables.at(0).choices=Array.from(getTargetsDB);
            const responseBinary =await inquirer.prompt(BinariesVulnerables);
            answers.binary = responseBinary;
            break;
        case MENU_TECNICA:
            TypeMethodQuestion.at(0).choices = [...getTypesDB];
            const responseType =await inquirer.prompt(TypeMethodQuestion);
            answers.type=responseType;
            break;
        default:

            break;
    }
    const responseContinue = await inquirer.prompt(nextQuestion);
    if(responseContinue.continue){
        OS();
    }else{
        const results = await getGuide(answers.os,answers.type, answers.binary);
        console.table(results);
        
        const responseIA = await inquirer.prompt(openAPIQuestion);

        if(Number(responseIA.ia) >= 0){
            const text = await IaPrompt(results[responseIA.ia]);
            buildtext(text);
        }

        inquirer.prompt(nextOrLeaveQuestion).then((response) => {
            if(response.next){OS()}
            else {
                database.end();
            }
        });
    }
}

OS();