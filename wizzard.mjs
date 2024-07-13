export const MENU_OS = '1. Sistema Operativo.';
export const MENU_TECNICA = '2. Tecnica.';
export const MENU_BINARIO = '3. Binario/ejecutable.';
export const MENU_SALIR = '0. Salir';

export const Wizard = [
    {
        type: 'list',
        name: 'option',
        message: 'Elija un primer filtro',
        choices: [
            MENU_OS,
            MENU_TECNICA,
            MENU_BINARIO,
            MENU_SALIR
        ]
    }
];

export const WizardNextFilter = [
    {
        type: 'confirm',
        name: 'nextFilter',
        message: '¿Quieres añadir otro filtro o ver los resultados?, en caso contrario seleccione NO',
    }
];

export const OSQuestion = [
    {
        type: 'checkbox',
        name: 'OS',
        message: '¿Qué sistema operativo estas analizando',
        choices: [
            'Windows 7',
            'Windows 8',
            'Windows 10'
        ]
    }
];

export const TypeMethodQuestion = [
    {
        type: 'list',
        name: 'typeAttack',
        message: '¿Que tipo de ataque/tecnica tienes en mente?',
        choices: []
    }
];

export const BinariesVulnerables = [
    {
        type: 'list',
        name: 'binaries',
        message: '¿Quieres preguntar por binarios en especifico?',
        choices: []
    }
];

export const nextQuestion = [
    {
        type: 'confirm',
        name: 'continue',
        message: '¿Quieres añadir otro filtro o ver los resultados?, en caso contrario seleccione NO',
    }
];

export const nextOrLeaveQuestion = [
    {
        type: 'confirm',
        name: 'next',
        message: '¿Quieres realizar una nueva busqueda?',
    }
];

/**
 * OPENAPI QUESTIONS
*/

export const openAPIQuestion = [
    {
        type: 'input',
        name: 'ia',
        message: '¿Te gustaria obtener información adicional basica (guia) sobre alguna fila de la tabla?, si la respuesta es SI, por favor digite el número de la fila, en caso contrario digite la letra S',
    }
];