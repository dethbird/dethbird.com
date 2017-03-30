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

    // !!!! power user action!!!
    ACTION: /^(.+)/g,
    ACTION_POWER_USER: /^(?:[!])(.*)/,
    CENTERED: /^(?:> *)(.+)(?: *<)(\n.+)*/g,

    NOTE: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
    NOTE_INLINE: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,

    LYRICS: /^(?:[~])(.*)/,
    PAGE_BREAK: /^\={3,}$/,
    LINE_BREAK: /^ {2}$/,

    EMPHASIS: /(_|\*{1,3}|_\*{1,3}|\*{1,3}_)(.+)(_|\*{1,3}|_\*{1,3}|\*{1,3}_)/g,
    BOLD_ITALIC_UNDERLINE: /(_{1}\*{3}(?=.+\*{3}_{1})|\*{3}_{1}(?=.+_{1}\*{3}))(.+?)(\*{3}_{1}|_{1}\*{3})/g,
    BOLD_UNDERLINE: /(_{1}\*{2}(?=.+\*{2}_{1})|\*{2}_{1}(?=.+_{1}\*{2}))(.+?)(\*{2}_{1}|_{1}\*{2})/g,
    ITALIC_UNDERLINE: /(?:_{1}\*{1}(?=.+\*{1}_{1})|\*{1}_{1}(?=.+_{1}\*{1}))(.+?)(\*{1}_{1}|_{1}\*{1})/g,
    BOLD_ITALIC: /(\*{3}(?=.+\*{3}))(.+?)(\*{3})/g,
    BOLD: /(\*{2}(?=.+\*{2}))(.+?)(\*{2})/g,
    ITALIC: /(\*{1}(?=.+\*{1}))(.+?)(\*{1})/g,
    UNDERLINE: /(_{1}(?=.+_{1}))(.+?)(_{1})/g

};

export const INLINE = {
    NOTE: '<span class=\"note\">$1</span>',
    LINE_BREAK: '<br />',
    BOLD_ITALIC_UNDERLINE: '<span class=\"bold italic underline\">$2</span>',
    BOLD_UNDERLINE: '<span class=\"bold underline\">$2</span>',
    ITALIC_UNDERLINE: '<span class=\"italic underline\">$2</span>',
    BOLD_ITALIC: '<span class=\"bold italic\">$2</span>',
    BOLD: '<span class=\"bold\">$2</span>',
    ITALIC: '<span class=\"italic\">$2</span>',
    UNDERLINE: '<span class=\"underline\">$2</span>'
};

export const tokenizeLines = (lines) => {

    lines = lines.reverse();

    let match, tokens = [];
    let lastDual = false;

    for( const i in lines ) {
        const line = lines[i];

        // boneyard
        if (match = line.match(REGEX.LEXER.BONEYARD)) {
            tokens.push({
                type: match[0][0] === '/' ? 'boneyard_begin' : 'boneyard_end'
            });
            continue;
        }

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
            const dual = lastDual | match[2]=='^';
            // last 2 chars are not spaces
            if (match[1].indexOf('  ') !== match[1].length - 2) {

                tokens.push({
                    type: dual ? 'dual_dialogue_end' : 'dialogue_end'
                });

                const parts = match[3].split(REGEX.PARENTHETICAL_DIALOGUE).reverse();

                // parenthetical found
                if (parts[1]) {

                    tokens.push({
                        type: 'dialogue',
                        text: parts[0].trim()
                    });
                    tokens.push({
                        type: 'parenthetical',
                        text: parts[1].trim()
                    });

                } else {
                    tokens.push({
                        type: 'dialogue',
                        text: match[3].trim()
                    });
                }

                tokens.push({
                    type: 'character',
                    text: match[1].trim()
                });

                tokens.push({
                    type: dual ? 'dual_dialogue_begin' : 'dialogue_begin'
                });

                lastDual = match[2]=='^';

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

            tokens.push({
                type: 'title_page_end'
            });

            match = line.replace(REGEX.TITLE_PAGE, '\n$1').split(REGEX.LEXER.SPLITTER).reverse();
            for (const i in match) {
                const parts = match[i].replace(REGEX.LEXER.CLEANER, '').split(/\:\n*/);
                tokens.push({
                    type: parts[0].trim().toLowerCase().replace(' ', '_'),
                    text: parts[1].trim()
                });
            }

            tokens.push({
                type: 'title_page_start'
            });

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

        // lyrics
        if (match = line.match(REGEX.LYRICS)) {
            const token = {
                type: 'lyrics',
                text: match[1]
            };
            tokens.push(token);
            continue;
        }

        // actions (power user)
        if (match = line.match(REGEX.ACTION_POWER_USER)) {
            const token = {
                type: 'action',
                text: match[1]
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

    return tokens.reverse();
}

export const lexizeScript = (script) => {
    return script.replace(REGEX.LEXER.BONEYARD, '\n$1\n')
        .replace(REGEX.LEXER.STANDARDIZER, '\n')
        .replace(REGEX.LEXER.CLEANER, '')
        .replace(REGEX.LEXER.WHITESPACER, '')
        .split(REGEX.LEXER.SPLITTER);
}

export const lexizeText = (text) => {

    if (!text) {
        return;
    }

    const styles = [
        'UNDERLINE',
        'ITALIC',
        'BOLD',
        'BOLD_ITALIC',
        'ITALIC_UNDERLINE',
        'BOLD_UNDERLINE',
        'BOLD_ITALIC_UNDERLINE'
    ];

    text = text.replace(REGEX.NOTE_INLINE, INLINE.NOTE)
        .replace(/\\\*/g, '[star]')
        .replace(/\\_/g, '[underline]')
        .replace(/\n/g, INLINE.LINE_BREAK);

    for (const i in styles) {
        const style = styles[i];
        if (REGEX[style].test(text)) {
            text = text.replace(style, INLINE[style]);
        }
    }

    return text.replace(/\[star\]/g, '*')
        .replace(/\[underline\]/g, '_')
        .trim();
}

export const compileTokens = (tokens) => {
    let title_page = [];
    let html = [];
    for( const i in tokens ) {
        const token = tokens[i];
        const text = lexizeText(token.text);

        switch (token.type) {

            // title page
            case 'title_page_start':
                title_page.push('<div class=\"title_page\">');
                break;
            case 'title':
                title_page.push('<h1 class=\"title\" >' + token.text + '</h1>');
                break;
            case 'credit':
                title_page.push('<p class=\"credit\">' + token.text + '</p>');
                break;
            case 'author':
                title_page.push('<p class=\"authors\">' + token.text + '</p>');
                break;
            case 'authors':
                title_page.push('<p class=\"authors\">' + token.text + '</p>');
                break;
            case 'source':
                title_page.push('<p class=\"source\">' + token.text + '</p>');
                break;
            case 'notes':
                title_page.push('<p class=\"notes\">' + token.text + '</p>');
                break;
            case 'draft_date':
                title_page.push('<p class=\"draft-date\">' + token.text + '</p>');
                break;
            case 'date':
                title_page.push('<p class=\"date\">' + token.text + '</p>');
                break;
            case 'contact':
                title_page.push('<p class=\"contact\">' + token.text + '</p>');
                break;
            case 'copyright':
                title_page.push('<p class=\"copyright\">' + token.text + '</p>');
                break;
            case 'title_page_end':
                title_page.push('</div>');
                break;

            // script body
            case 'scene_heading':
                html.push('<h3 class=\"scene_heading\" ' + (token.scene_number ? ' id=\"' + token.scene_number + '\">' : '>') + token.text + '</h3>');
                break;
            case 'transition':
                html.push('<h2 class=\"transition\">' + token.text + '</h2>');
                break;

            case 'dual_dialogue_begin':
                html.push('<div class=\"dialogue dual\">');
                break;
            case 'dialogue_begin':
                html.push('<div class=\"dialogue\">');
                break;
            case 'character':
                html.push('<h4 class=\"character\">' + token.text + '</h4>');
                break;
            case 'parenthetical':
                html.push('<p class=\"parenthetical\">' + token.text + '</p>');
                break;
            case 'dialogue':
                html.push('<p class=\"dialogue\">' + token.text + '</p>');
                break;
            case 'dialogue_end':
                html.push('</div>');
                break;
            case 'dual_dialogue_end':
                html.push('</div>');
                break;

            case 'section':
                html.push('<h' + token.level +' class=\"section\" data-depth=\"' + token.level + '\">' + token.text + '</h' + token.level +'>');
                break;
            case 'synopsis':
                html.push('<p class=\"synopsis\">' + token.text + '</p>');
                break;

            case 'note':
                html.push('<span class=\"note\"> ' + token.text + '</span>');
                break;
            case 'boneyard_begin':
                html.push('<!-- ');
                break;
            case 'boneyard_end':
                html.push(' -->');
                break;

            case 'action':
                html.push('<p class=\"action\">' + token.text + '</p>');
                break;
            case 'centered':
                html.push('<p class=\"centered\">' + token.text + '</p>');
                break;


            case 'lyrics':
                html.push('<span class=\"lyrics\">' + token.text + '</span>');
                break;

            case 'page_break':
                html.push('<hr />');
                break;
            case 'line_break':
                html.push('<br />');
                break;
        }
    }

    return title_page.join('') + (
        html.length
        ? ('<div class=\"script_body\">' + html.join('') + '</div>')
        : null
    );
}

export const parseFountainScript = (script) => {
    const tokens = tokenizeLines( lexizeScript(script) );
    const html = compileTokens(tokens);
    return { tokens, html };
}
