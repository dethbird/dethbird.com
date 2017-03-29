export const REGEX = {

    LEXER: {
        BONEYARD: /(^\/\*|^\*\/)$/g,
        SPLITTER: /\n{2,}/g,
        CLEANER: /^\n+|\n+$/,
        STANDARDIZER: /\r\n|\r/g,
        WHITESPACER: /^\t+|^ {3,}/gm
    },

    TITLE_PAGE: /^((?:title|credit|author[s]?|source|notes|draft date|date|contact|copyright)\:)/gim,

    SCENE_HEADING: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
    SCENE_NUMBER: /( *#(.+)# *)/,

    TRANSITION: /^((?:FADE (?:TO BLACK|OUT)|CUT TO BLACK)\.|.+ TO\:)|^(?:> *)(.+)/,

    DIALOGUE: /^([A-Z*_]+[0-9A-Z (._\-')]*)(\^?)?(?:\n(?!\n+))([\s\S]+)/,
    DIALOGUE_POWER_USER: /^(?:[@])([a-zA-Z*_]+[0-9A-Z (._\-')]*)(\^?)?(?:\n)([\s\S]+)/,
    PARENTHETICAL_DIALOGUE: /(\(.+\))(?:\n+)/,

    SECTION: /^(#+)(?: *)(.*)/,
    SYNOPSIS: /^(?:\=(?!\=+) *)(.*)/,

    action: /^(.+)/g,
    CENTERED: /^(?:> *)(.+)(?: *<)(\n.+)*/g,

    NOTE: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
    note_inline: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,


    PAGE_BREAK: /^\={3,}$/,
    LINE_BREAK: /^ {2}$/,

    emphasis: /(_|\*{1,3}|_\*{1,3}|\*{1,3}_)(.+)(_|\*{1,3}|_\*{1,3}|\*{1,3}_)/g,
    bold_italic_underline: /(_{1}\*{3}(?=.+\*{3}_{1})|\*{3}_{1}(?=.+_{1}\*{3}))(.+?)(\*{3}_{1}|_{1}\*{3})/g,
    bold_underline: /(_{1}\*{2}(?=.+\*{2}_{1})|\*{2}_{1}(?=.+_{1}\*{2}))(.+?)(\*{2}_{1}|_{1}\*{2})/g,
    italic_underline: /(?:_{1}\*{1}(?=.+\*{1}_{1})|\*{1}_{1}(?=.+_{1}\*{1}))(.+?)(\*{1}_{1}|_{1}\*{1})/g,
    bold_italic: /(\*{3}(?=.+\*{3}))(.+?)(\*{3})/g,
    bold: /(\*{2}(?=.+\*{2}))(.+?)(\*{2})/g,
    italic: /(\*{1}(?=.+\*{1}))(.+?)(\*{1})/g,
    underline: /(_{1}(?=.+_{1}))(.+?)(_{1})/g

};

export const tokenizeLines = (lines) => {


    let match, tokens = [];

    for( const i in lines ) {
        const line = lines[i];

        // // boneyard
        // if (match = line.match(REGEX.LEXER.BONEYARD)) {
        //     tokens.push({
        //         type: match[0][0] === '/' ? 'boneyard_begin' : 'boneyard_end'
        //     });
        //     continue;
        // }

        // centered
        if (match = line.match(REGEX.CENTERED)) {
            tokens.push({
                type: 'centered',
                text: match[0].replace(/>|</g, '')
            });
            continue;
        }

        // dialogue blocks - characters, parentheticals and dialogue
        match = line.match(REGEX.DIALOGUE);
        if (!match) {
            match = line.match(REGEX.DIALOGUE_POWER_USER);
        }
        if (match) {

            // last 2 chars are not spaces
            if (match[1].indexOf('  ') !== match[1].length - 2) {

                tokens.push({
                    type: 'dialogue_start',
                    dual: match[2]=='^'
                });

                tokens.push({
                    type: 'character',
                    text: match[1].trim()
                });

                const parts = match[3].split(REGEX.PARENTHETICAL_DIALOGUE).reverse();

                // parenthetical found
                if (parts[1]) {
                    tokens.push({
                        type: 'parenthetical',
                        text: parts[1].trim()
                    });

                    tokens.push({
                        type: 'dialogue',
                        text: parts[0].trim()
                    });

                } else {
                    tokens.push({
                        type: 'dialogue',
                        text: match[3].trim()
                    });
                }

                tokens.push({
                    type: 'dialogue_end',
                    dual: match[2]=='^'
                });
                continue;
            }
        }

        // line breaks
        if (REGEX.LINE_BREAK.test(line)) {
            tokens.push({
                type: 'line_break'
            });
            continue;
        }

        // page breaks
        if (REGEX.PAGE_BREAK.test(line)) {
            tokens.push({
                type: 'page_break'
            });
            continue;
        }

        // notes
        if (match = line.match(REGEX.NOTE)) {
            tokens.push({
                type: 'note',
                text: match[1]
            });
            continue;
        }

        // scene headings with scene numbers
        if (match = line.match(REGEX.SCENE_HEADING)) {
            let text = match[1] || match[2];
            let scene_number;

            // last 2 chars are not spaces
            if (text.indexOf('  ') !== text.length - 2) {
                if (scene_number = text.match(REGEX.SCENE_NUMBER)) {
                    scene_number = scene_number[2];
                    text = text.replace(REGEX.SCENE_NUMBER, '');
                }
            }

            const token = {
                type: 'scene_heading',
                text,
                scene_number
            };
            tokens.push(token);
            continue;
        }

        // section
        if (match = line.match(REGEX.SECTION)) {
            const token = {
                type: 'section',
                text: match[2],
                level: match[1].length
            };
            tokens.push(token);
            continue;
        }

        // synopsis
        if (match = line.match(REGEX.SYNOPSIS)) {
            const token = {
                type: 'synopsis',
                text: match[1]
            };
            tokens.push(token);
            continue;
        }

        // title page
        if (REGEX.TITLE_PAGE.test(line)) {
            match = line.replace(REGEX.TITLE_PAGE, '\n$1').split(REGEX.LEXER.SPLITTER);
            for (const i in match) {
                const parts = match[i].replace(REGEX.LEXER.CLEANER, '').split(/\:\n*/);
                tokens.push({
                    type: parts[0].trim().toLowerCase().replace(' ', '_'),
                    text: parts[1].trim()
                });
            }
            continue;
        }

        // transitions
        if (match = line.match(REGEX.TRANSITION)) {
            const token = {
                type: 'transition',
                text: match[1] || match[2]
            };
            tokens.push(token);
            continue;
        }

        // defaut: action
        tokens.push({
            type: 'action',
            text: line
        });

    }

    return tokens;
}
export const lexizeScript = (script) => {
    return script.replace(REGEX.LEXER.BONEYARD, '\n$1\n')
        .replace(REGEX.LEXER.STANDARDIZER, '\n')
        .replace(REGEX.LEXER.CLEANER, '')
        .replace(REGEX.LEXER.WHITESPACER, '')
        .split(REGEX.LEXER.SPLITTER);
}

export const compileTokens = (tokens) => {
    for( const i in tokens ) {
        const token = tokens[i];
        console.log(token);
    }
}

export const parseFountainScript = (script) => {
    const compiled = tokenizeLines( lexizeScript(script) );
    return { compiled };
}
