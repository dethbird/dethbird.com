import { log } from 'utility/logger';
import * as _ from 'underscore';

export const REGEX = {
    LEXER: {
        BONEYARD: /(^\/\*|^\*\/)$/g,
        SPLITTER: /\n/g,
        CLEANER: /^\n+|\n+$/,
        STANDARDIZER: /\r\n|\r/g,
        WHITESPACER: /^\t+|^ {3,}/gm
    },

    ACTION: /^(.+)/g,
    ACTION_POWER_USER: /^(?:[!])(.*)/,
    BLANK_LINE: /(\n)/,
    CHARACTER: /^([A-Z][A-Z0-9'\-. ]+)(\([A-Za-z0-9'\-. ]+\))?(?:\ )?(\^)?/,
    CHARACTER_POWER_USER: /^(?:\@)([A-Za-z0-9'\-. ][A-Za-z0-9'\-.]+)(?:\ )?(\([A-Za-z0-9'\-. ]+\))?(?:\ )?(\^)?/,
    CENTERED: /^(?:> *)(.+)(?: *<)(\n.+)*/g,
    IMAGE: /^(https:\/\/(.+)?.(jpg|jpeg|gif|png|svg))/i,
    DURATION: /^([0-9]?[0-9]:[0-9][0-9])/,
    LYRICS: /^(?:~)([\S\s]+)/,
    NOTE: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
    PAGE_BREAK: /^\={3,}$/,
    SCENE: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
    SCENE_NUMBER: /( *#(.+)# *)/,
    SECTION: /^(#{1,4})\ (.*)/,
    SYNOPSIS: /^(?:\=(?!\=+) *)(.*)/,
    TITLE: /^((?:title|credit|author[s]?|source|notes|draft date|date|contact|copyright)\:)/gim,
    TRANSITION: /^((?:FADE (?:TO BLACK|OUT)|CUT TO BLACK)\.|.+ TO\:)|^(?:> *)(.+)/i
}

export const tokenizeScript = (script) => {
    const lines = lexizeScript(script);

    let titleTokens = [];
    let scriptTokens = [];
    let characterCounts = [];
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
            if (lines.length > nextIndex) {
                const nextLine = lines[nextIndex];
                if (nextLine.text !== '\n') {
                    token.lines.push(line);
                    token.type = 'dialogue';
                    token.model = {
                        character: match[1].trim(),
                        parenthetical: match[2] ? match[2].trim() : match[2],
                        dual: match[3] ? match[3].trim() : match[3],
                        text: []
                    }
                    let dialogueLine = nextLine;
                    while (dialogueLine.text !== '\n') {
                        token.lines.push(dialogueLine);
                        token.model.text.push(dialogueLine.text);
                        nextIndex++;
                        dialogueLine = lines[nextIndex];
                    }
                    i = nextIndex - 1;
                    scriptTokens.push(token);
                    i++;
                    continue;
                }

            }
        }
        // sections
        match = line.text.match(REGEX.SECTION);
        if(match) {
            token.lines.push(line);
            token.type = 'section';
            token.model = {
                identifier: match[1],
                level: match[1].length,
                text: [ match[2] ]
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
            scriptTokens.push(token);
            i++;
            continue;
        }

        // scene
        match = line.text.match(REGEX.SCENE);
        if(match){
            token.lines.push(line);
            token.type = 'scene';
            token.model = {
                text: [match[1] || match[2]]
            }
            if (token.model.text.indexOf('  ') !== token.model.text.length - 2) {
                let scene_number;
                if (scene_number = token.model.text.match(REGEX.SCENE_NUMBER)) {
                    token.model.scene_number = scene_number[2];
                    token.model.text = [token.model.text.replace(REGEX.SCENE_NUMBER, '')];
                }
            }
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.NOTE);
        if (match) {
            token.lines.push(line);
            token.type = 'note';
            token.model = {
                text: [match[1].trim()]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.SYNOPSIS);
        if (match) {
            token.lines.push(line);
            token.type = 'synopsis';
            token.model = {
                text: [match[1].trim()]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.BLANK_LINE);
        if (match) {
            token.lines.push(line);
            token.type = 'blank_line';
            token.model = {
                text: [line]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.PAGE_BREAK);
        if (match) {
            token.lines.push(line);
            token.type = 'page_break';
            token.model = {
                text: [line]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.CENTERED);
        if (match) {
            token.lines.push(line);
            token.type = 'centered';
            token.model = {
                text: [line]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.TRANSITION);
        if (match) {
            token.lines.push(line);
            token.type = 'transition';
            token.model = {
                text: [line]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.LYRICS);
        if (match) {
            token.lines.push(line);
            token.type = 'lyrics';
            token.model = {
                text: [ match[1].trim() ]
            };
            let nextIndex = parseInt(i)+1;
            if (lines.length > nextIndex) {
                let nextLine = lines[nextIndex];
                match = nextLine.text.match(REGEX.LYRICS);
                if (match) {
                    while (match) {
                        token.lines.push(nextLine);
                        token.model.text.push(match[1].trim());
                        nextIndex++;
                        nextLine = lines[nextIndex];
                        match = nextLine.text.match(REGEX.LYRICS);
                    }
                    i = nextIndex - 1;
                }
            }
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.TITLE);
        if (match) {
            token.lines.push(line);
            token.type_text =  match[0];
            token.type = match[0].toLowerCase().replace(' ', '_');
            token.type = token.type.slice(0, token.type.length - 1);
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
                        token.model.text.push(nextLine.text);
                        nextIndex++;
                        nextLine = lines[nextIndex]
                        match = nextLine.text.match(REGEX.TITLE);
                    }
                    i = nextIndex - 1;
                }
            }
            titleTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.ACTION);
        if (!match)
            match = line.text.match(REGEX.ACTION_POWER_USER);
        if(match){
            let text = line.text;
            if (text.indexOf('!')==0) {
                text = text.slice(1);
                text = text.trim();
            }
            token.lines.push(line);
            token.type = 'action';
            token.model = {
                text: [text]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }
        i++;
    }

    // dual dialogue and characters
    scriptTokens.reverse();
    let _scriptTokens = [];
    i = 0;
    while (i < scriptTokens.length) {
        const token = scriptTokens[i];
        if( token.type=='dialogue') {
            _scriptTokens.push(token);

            if (characterCounts[token.model.character]==undefined) {
                characterCounts[token.model.character] = 1;
            } else {
                characterCounts[token.model.character]++;
            }

            if (token.model.dual) {
                let nextIndex = parseInt(i) + 1;
                if (scriptTokens.length > nextIndex) {
                    let nextToken = scriptTokens[i];
                    while (nextToken.type=='dialogue') {
                        nextToken.model.dual = true;
                        _scriptTokens.push(nextToken);
                        nextIndex++;
                        nextToken = scriptTokens[nextIndex];
                    }
                    i = nextIndex - 1;
                }
            }
        } else {
            _scriptTokens.push(token);
        }
        i++;
    }
    scriptTokens = _scriptTokens.reverse();

    const keys = _.keys(characterCounts);
    let characters = keys.map(function(key){
        return {
            name: key,
            parts: characterCounts[key]
        };
    });
    characters = _.sortBy(characters, 'name');

    return {
        scriptTokens,
        titleTokens,
        characters
    };
}


export const lexizeScript = (script) => {
    const lines = script
        .replace(REGEX.LEXER.STANDARDIZER, '\n')
        .replace(REGEX.LEXER.CLEANER, '')
        .replace(REGEX.LEXER.WHITESPACER, '')
        .split(REGEX.LEXER.SPLITTER);
    const lex = lines.map(function(line, i){
        if (line)
            return {text: line.trim(), index: i};
        return {text: '\n', index: i};
    });
    return lex;
};
