import { log } from 'utility/logger';

export const REGEX = {
    LEXER: {
        BONEYARD: /(^\/\*|^\*\/)$/g,
        SPLITTER: /\n/g,
        CLEANER: /^\n+|\n+$/,
        STANDARDIZER: /\r\n|\r/g,
        WHITESPACER: /^\t+|^ {3,}/gm
    },

    CHARACTER: /^([A-Z][A-Z0-9'\-. ]+)(\([A-Za-z0-9'\-. ]+\))?(?:\ )?(\^)?/,
    CHARACTER_POWER_USER: /^(?:\@)([A-Za-z0-9'\-. ][A-Za-z0-9'\-.]+)(?:\ )?(\([A-Za-z0-9'\-. ]+\))?(?:\ )?(\^)?/,
}

export const tokenizeScript = (script) => {
    const lines = lexizeScript(script);

    let titleTokens = [];
    let scriptTokens = [];
    let state = {
        character: false
    };
    for (let i in lines) {
        const line = lines[i];
        let match = false;
        let token = {
            type: undefined,
            lines: [],
            model: undefined
        };

        // character and dialogue
        match = line.text.match(REGEX.CHARACTER);
        if (!match)
            match = line.text.match(REGEX.CHARACTER_POWER_USER);
        if(match){
            let nextIndex = parseInt(i)+1;
            // console.log(match[0]);
            if (lines.length >= nextIndex) {
                const nextLine = lines[nextIndex];
                if (nextLine.text !== '\n') {
                    // process dialogue
                    token.lines.push(line);
                    token.type = 'dialogue';
                    token.model = {
                        character: match[1].trim(),
                        parenthetical: match[2] ? match[2].trim() : match[2],
                        dual: match[3] ? match[3].trim() : match[3],
                        dialogue: []
                    }
                    let dialogueLine = nextLine;
                    while (dialogueLine.text !== '\n') {
                        token.lines.push(dialogueLine);
                        token.model.dialogue.push(dialogueLine.text);
                        nextIndex++;
                        dialogueLine = lines[nextIndex];
                    }
                    i = nextIndex;
                }
            }
        }
        scriptTokens.push(token);
    }
    log(scriptTokens);
}


export const lexizeScript = (script) => {
    const lines = script
        .replace(REGEX.LEXER.STANDARDIZER, '\n')
        .replace(REGEX.LEXER.CLEANER, '')
        .replace(REGEX.LEXER.WHITESPACER, '')
        .split(REGEX.LEXER.SPLITTER);
    const lex = lines.map(function(line, i){
        if (line)
            return {text: line, index: i};
        return {text: '\n', index: i};
    });
    return lex;
};
