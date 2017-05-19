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
    SECTION: /^(#{1,4})\ (.*)/,
    IMAGE: /^(https:\/\/(.+)?.(jpg|jpeg|gif|png|svg))/i,
    DURATION: /^([0-9]?[0-9]:[0-9][0-9])/,
    SCENE: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
    SCENE_NUMBER: /( *#(.+)# *)/,
    NOTE: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
    SYNOPSIS: /^(?:\=(?!\=+) *)(.*)/,
    LYRICS: /^(?:~)([\S\s]+)/,
    BLANK_LINE: /(\n)/,

    TITLE: /^((?:title|credit|author[s]?|source|notes|draft date|date|contact|copyright)\:)/gim,
}

export const tokenizeScript = (script) => {
    const lines = lexizeScript(script);

    let titleTokens = [];
    let scriptTokens = [];
    let state = {
        character: false
    };
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        let match = false;
        let token = {
            type: undefined,
            lines: [],
            model: undefined
        };

        let tokenType = undefined;

        // character and dialogue
        match = line.text.match(REGEX.CHARACTER);
        if (!match)
            match = line.text.match(REGEX.CHARACTER_POWER_USER);
        if(match){
            let nextIndex = parseInt(i)+1;
            // console.log(match[0]);
            if (lines.length > nextIndex) {
                const nextLine = lines[nextIndex];
                if (nextLine.text !== '\n') {
                    // process dialogue
                    tokenType = 'script';
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
                    i = nextIndex - 1;
                }
            }
        }

        // sections
        match = line.text.match(REGEX.SECTION);
        if(match) {
            tokenType = 'script';
            token.lines.push(line);
            token.type = 'section';
            token.model = {
                identifier: match[1],
                level: match[1].length,
                text: match[2]
            }
            let nextIndex = parseInt(i)+1;
            if (lines.length > nextIndex) {
                let nextLine = lines[nextIndex];
                if (nextLine.text !== '\n') {
                    if (match[1].length == 4) {
                        while (nextLine.text !== '\n') {
                            token.lines.push(nextLine);
                            if(REGEX.IMAGE.test(nextLine.text)){
                                token.model.image = nextLine.text.trim()
                            }
                            if(REGEX.DURATION.test(nextLine.text)){
                                token.model.duration = nextLine.text.trim()
                            }
                            nextIndex++;
                            nextLine = lines[nextIndex];
                        }
                        i = nextIndex - 1;
                    }
                }
            }
        }

        // scene
        match = line.text.match(REGEX.SCENE);
        if(match){
            tokenType = 'script';
            token.lines.push(line);
            token.type = 'scene';
            token.model = {
                text: match[1] || match[2]
            }
            if (token.model.text.indexOf('  ') !== token.model.text.length - 2) {
                let scene_number;
                if (scene_number = token.model.text.match(REGEX.SCENE_NUMBER)) {
                    token.model.scene_number = scene_number[2];
                    token.model.text = token.model.text.replace(REGEX.SCENE_NUMBER, '');
                }
            }
        }

        match = line.text.match(REGEX.NOTE);
        if (match) {
            tokenType = 'script';
            token.lines.push(line);
            token.type = 'note';
            token.model = {
                text: match[1].trim()
            };
        }

        match = line.text.match(REGEX.SYNOPSIS);
        if (match) {
            tokenType = 'script';
            token.lines.push(line);
            token.type = 'synopsis';
            token.model = {
                text: match[1].trim()
            };
        }

        match = line.text.match(REGEX.BLANK_LINE);
        if (match) {
            tokenType = 'script';
            token.lines.push(line);
            token.type = 'blank_line';
            token.model = {
                text: line
            };
        }

        match = line.text.match(REGEX.LYRICS);
        if (match) {
            tokenType = 'script';
            token.lines.push(line);
            token.type = 'lyrics';
            token.model = {
                lyrics: [ match[1].trim() ]
            };
            let nextIndex = parseInt(i)+1;
            if (lines.length > nextIndex) {
                let nextLine = lines[nextIndex];
                match = nextLine.text.match(REGEX.LYRICS);
                if (match) {
                    while (match) {
                        token.lines.push(nextLine);
                        token.model.lyrics.push(match[1].trim());
                        nextIndex++;
                        nextLine = lines[nextIndex];
                        match = nextLine.text.match(REGEX.LYRICS);
                    }
                    i = nextIndex - 1;
                }
            }
        }

        match = line.text.match(REGEX.TITLE);
        if (match) {
            tokenType = 'title';
            token.lines.push(line);
            token.type = match[0].toLowerCase().replace(' ', '_');
            const text = line.text.replace(match[0], '') .trim();
            token.model = {
                text: text ? [ text ] : []
            };
            let nextIndex = parseInt(i)+1;
            if (lines.length > nextIndex) {
                let nextLine = lines[nextIndex];
                match = nextLine.text.match(REGEX.TITLE);
                if (!match && nextLine.text !== '\n') {
                    while (!match && nextLine.text !== '\n') {
                        token.lines.push(nextLine);
                        token.model.text.push(nextLine);
                        nextIndex++;
                        nextLine = lines[nextIndex];
                        match = nextLine.text.match(REGEX.TITLE);
                    }
                    i = nextIndex - 1;
                }
            }
        }


        if (tokenType == 'script')
            scriptTokens.push(token);

        if (tokenType == 'title')
            titleTokens.push(token);

        i++;
    }
    log(scriptTokens);
    log(titleTokens);
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
