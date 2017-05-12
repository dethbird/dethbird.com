import uuidV4 from 'uuid/v4';
import moment from 'moment';
import pad from 'pad-left';
import * as _ from 'underscore';
import { log } from 'utility/logger';

export const SECTION_LEVELS = [
    "",
    "act",
    "sequence",
    "scene",
    "panel"
];

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

    DIALOGUE: /^([A-Z][A-Z0-9'\-. ]+)(\ \([A-Za-z0-9'\-. ]+\))?(?:\ )?(\^)?(?:\n)(\([A-Za-z0-9 ]+\)(?:\n))?([\s\S]+)/,
    DIALOGUE_POWER_USER: /^(?:[@])([A-Za-z0-9'\-. ]+)(\ \([A-Za-z0-9'\-. ]+\))?(?:\ )?(\^)?(?:\n)(\([A-Za-z0-9 ]+\)(?:\n))?([\s\S]+)/,

    SECTION: /^(#{1,4})\ (.*)(?:\n)?(https:\/\/.*.(jpg|jpeg|gif|png|svg))?(?:\n)?([0-9]?[0-9]:[0-9][0-9])?/i,
    SYNOPSIS: /^(?:\=(?!\=+) *)(.*)/,

    // !!!! power user action!!!
    ACTION: /^(.+)/g,
    ACTION_POWER_USER: /^(?:[!])(.*)/,
    CENTERED: /^(?:> *)(.+)(?: *<)(\n.+)*/g,

    NOTE: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
    NOTE_INLINE: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,

    LYRICS: /^(?:~)([\S\s]+)/,
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


export const durationToMilliseconds = (duration) => {
    if(!duration) {
        return 3000;
    }

    const parts = duration.split(':').reverse();
    let seconds = 0, i;
    for(i in parts) {
        seconds = seconds + (parseInt(parts[i]) * Math.pow(60, i));
    }
    return seconds * 1000;
}

export const milisecondsToDuration = (miliseconds) => {
    let duration = moment.duration(miliseconds);
    return [pad(duration.get('hours'), 2, '0'), pad(duration.get('minutes'), 2, '0'), pad(duration.get('seconds'), 2, '0')].join(':');
}

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
                type: 'action',
                text: match[0].replace(/>|</g, ''),
                centered: true
            });
            continue;
        }

        // dialogue blocks - characters, parentheticals and dialogue
        match = line.match(REGEX.DIALOGUE);
        if (!match) {
            match = line.match(REGEX.DIALOGUE_POWER_USER);
        }
        if (match) {
            const dual = lastDual | match[3]=='^';

            // last 2 chars are not spaces
            if (match[1].indexOf('  ') !== match[1].length - 2) {

                tokens.push({
                    type: dual ? 'dual_dialogue_end' : 'dialogue_end'
                });

                tokens.push({
                    type: 'dialogue',
                    text: match[5].trim()
                });
                if (match[4]) {

                    tokens.push({
                        type: 'parenthetical',
                        text: match[4].trim()
                    });

                }

                tokens.push({
                    type: 'character',
                    text: match[1],
                    extension: match[2] ? match[2].trim() : null
                });

                tokens.push({
                    type: dual ? 'dual_dialogue_begin' : 'dialogue_begin'
                });

                lastDual = match[3]=='^';

                continue;
            }
        }

        // line breaks
        if (match = REGEX.LINE_BREAK.test(line)) {
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
                level_text: match[1],
                level: match[1].length,
                image: match[3],
                duration: match[1].length == 4 ? match[5] : false,
                duration_in_miliseconds: match[1].length == 4 ? durationToMilliseconds(match[5]) : false
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
            tokens.push({
                type: 'lyrics_end'
            });
            const lyrics = match[1].split('~');
            for (const i in lyrics) {
                const token = {
                    type: 'lyrics',
                    text: lyrics[i].trim()
                };
                tokens.push(token);
            }
            tokens.push({
                type: 'lyrics_begin'
            });
            continue;
        }

        // actions (power user)
        if (match = line.match(REGEX.ACTION_POWER_USER)) {
            const token = {
                type: 'action',
                text: match[1],
                centered: false
            };
            tokens.push(token);
            continue;
        }

        // defaut: action
        if(line.trim()){
            tokens.push({
                type: 'action',
                text: line,
                centered: false
            });
        }

    }

    return sectionizeTokens(tokens.reverse());
}



export const sectionizeTokens = (tokens) => {
    let newTokens = [];
    let sections = [];
    let lastSection;
    for (const i in tokens) {
        const token = tokens[i];
        if (token.type == 'section') {

            if (sections.length > 0) {
                lastSection = sections.pop();
            }

            if (lastSection) {

                if (token.level > lastSection.level ) {

                    sections.push(lastSection);
                    sections.push(token);

                } else {
                    newTokens.push({
                        type: 'section_end',
                        text: lastSection.text,
                        level: lastSection.level
                    });

                    let s;
                    while (s = sections.pop()) {
                        if (s.level <= lastSection.level && s.level >= token.level) {
                            newTokens.push({
                                type: 'section_end',
                                text: s.text,
                                level: s.level
                            });
                        } else {
                        sections.push(s);
                            sections.push(token);
                            break;
                        }

                    }
                    if (sections.length==0) {
                        sections.push(token);
                    }
                }
            } else {
                sections.push(token);
            }

            newTokens.push({
                ... token,
                type: 'section_begin'
            });

        } else {
            newTokens.push(token);
        }
    }

    if(sections.length > 0) {
        let s;
        while (s = sections.pop()) {
            newTokens.push({
                type: 'section_end',
                text: s.text,
                level: s.level
            })
        }
    }
    return newTokens;
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
        'BOLD_ITALIC',
        'BOLD',
        'ITALIC',
        'UNDERLINE',
        'ITALIC_UNDERLINE',
        'BOLD_UNDERLINE',
        'BOLD_ITALIC_UNDERLINE'
    ];

    text = text.replace(REGEX.NOTE_INLINE, INLINE.NOTE)
        .replace(/\\\*/g, '[star]')
        .replace(/\\_/g, '[underline]')
        .replace(/\n/g, INLINE.LINE_BREAK)
        .replace(/{two spaces}/g, '\n');

    for (const i in styles) {
        const style = styles[i];
        if (REGEX[style].test(text)) {
            text = text.replace(REGEX[style], INLINE[style]);
            continue;
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
                title_page.push('<h1 class=\"title\" >' + text + '</h1>');
                break;
            case 'credit':
                title_page.push('<div class=\"credits-container\"><span class=\"credit\">' + text + ' </span>');
                break;
            case 'author':
                title_page.push('<span class=\"authors\">' + text + '</span></div>');
                break;
            case 'authors':
                title_page.push('<span class=\"authors\">' + text + '</span></div>');
                break;
            case 'source':
                title_page.push('<span class=\"source\">' + text + '</span>');
                break;
            case 'notes':
                title_page.push('<span class=\"notes\">' + text + '</span>');
                break;
            case 'draft_date':
                title_page.push('<span class=\"draft-date\">' + text + '</span>');
                break;
            case 'date':
                title_page.push('<span class=\"date\">' + text + '</span>');
                break;
            case 'contact':
                title_page.push('<span class=\"contact\">' + text + '</span>');
                break;
            case 'copyright':
                title_page.push('<span class=\"copyright\">' + text + '</span>');
                break;
            case 'title_page_end':
                title_page.push('</div>');
                break;

            // script body
            case 'scene_heading':
                html.push('<h4 class=\"scene_heading\" ' + (token.scene_number ? ' id=\"' + token.scene_number + '\">' : '>') + text + '</h4>');
                break;
            case 'transition':
                html.push('<h2 class=\"transition\">' + text + '</h2>');
                break;

            case 'dual_dialogue_begin':
                html.push('<div class=\"dialogue-container dual\">');
                break;
            case 'dialogue_begin':
                html.push('<div class=\"dialogue-container\">');
                break;
            case 'character':
                const extension = token.extension ? lexizeText(token.extension) : null;
                html.push('<h4 class=\"character\">' + text + ( extension ? ' <span class=\"character_extension\">' + extension + '</span>' :  '' ) +'</h4>');
                break;
            case 'parenthetical':
                html.push('<span class=\"parenthetical\">' + text + '</span>');
                break;
            case 'dialogue':
                html.push('<span class=\"dialogue\">' + text + '</span>');
                break;
            case 'dialogue_end':
                html.push('</div>');
                break;
            case 'dual_dialogue_end':
                html.push('</div>');
                break;

            case 'section_begin':
                html.push('<div class=\"section-container ' + SECTION_LEVELS[token.level] + '\">');
                html.push('<h' + token.level +' class=\"section ' + SECTION_LEVELS[token.level] + '\"><span class=\"section level-text ' + SECTION_LEVELS[token.level] + '\">' + token.level_text + '</span>' + text + '</h' + token.level +'>');
                if (token.image) {
                    html.push('<div class=\"section-image-container\">');
                    html.push('<img class=\"section-image ' + SECTION_LEVELS[token.level] + '\" src=\"' + token.image + '\" />');
                    html.push('</div>');
                }
                if (token.duration) {
                    html.push('<span class=\"section-duration\">' + token.duration + '</span>');
                }
                break;

            case 'section_end':
                html.push('</div>');
                break;

            case 'synopsis':
                html.push('<span class=\"synopsis\">' + text + '</span>');
                break;

            case 'note':
                html.push('<span class=\"note\"> ' + text + '</span>');
                break;
            case 'boneyard_begin':
                html.push('<!-- ');
                break;
            case 'boneyard_end':
                html.push(' -->');
                break;

            case 'action':
                html.push('<span class=\"action' + (token.centered ? ' centered' : '' ) + '\">' + text + '</span>');
                break;

            case 'lyrics_begin':
                html.push('<div class=\"lyrics-container\">');
                break;
            case 'lyrics':
                html.push('<span class=\"lyrics\">' + text + '</span>');
                break;
            case 'lyrics_end':
                html.push('</div>');
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
        : ''
    );
}

export const convertTokensToStory = (tokens) => {
    let story = {};
    story.acts = [];
    story.type = 'story';
    story.id = uuidV4();

    for(let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.type=='title_page_start') {
            for(let j = i + 1; j < tokens.length; j++) {
                // look ahead until next section_begin
                if(tokens[j].type != "title_page_end") {
                    // section content
                    story[tokens[j].type] = tokens[j].text;
                } else {
                    break;
                }
            }
        }

        if (token.type=='section_begin') {
            token.tokens = [];
            for(let j = i + 1; j < tokens.length; j++) {
                // look ahead until next section_begin
                if(tokens[j].type !== "section_begin" && tokens[j].type != "section_end") {
                    token.tokens.push(tokens[j]);
                } else {
                    i = j-1;
                    break;
                }
            }

            if (token.level == 1) {
                // token.sequences = [];
                delete token.duration;
                delete token.level;
                story.acts.push({
                    ... token,
                    type: 'act',
                    id: uuidV4(),
                    sequences: []
                });
            }
            if (token.level == 2) {
                if (story.acts.length < 1) {
                    story.acts.push({
                        id: uuidV4(),
                        type: 'act',
                        text: 'Act',
                        level_text: '#',
                        image: undefined,
                        tokens: [],
                        sequences: []
                    });
                }

                delete token.duration;
                delete token.level;
                story.acts[
                    story.acts.length - 1
                ].sequences.push({
                    ... token,
                    id: uuidV4(),
                    type: 'sequence',
                    scenes: []
                });
            }
            if (token.level == 3) {
                token.panels = [];

                if (story.acts.length < 1) {
                    story.acts.push({
                        id: uuidV4(),
                        type: 'act',
                        text: 'Act',
                        level_text: '#',
                        image: undefined,
                        tokens: [],
                        sequences: []
                    });
                }

                if (story.acts[story.acts.length - 1].sequences.length < 1) {
                    story.acts[story.acts.length - 1].sequences.push({
                        id: uuidV4(),
                        type: 'sequence',
                        text: 'Sequence',
                        level_text: '##',
                        image: undefined,
                        tokens: [],
                        scenes: []
                    });
                }

                delete token.duration;
                delete token.level;
                story.acts[
                    story.acts.length - 1
                ].sequences[
                    story.acts[
                        story.acts.length - 1
                    ].sequences.length - 1
                ].scenes.push({
                    ... token,
                    id: uuidV4(),
                    type: 'scene',
                    panels: []
                });
            }
            if (token.level == 4) {

                if (story.acts.length < 1) {
                    story.acts.push({
                        id: uuidV4(),
                        type: 'act',
                        text: 'Act',
                        level_text: '#',
                        image: undefined,
                        tokens: [],
                        sequences: []
                    });
                }

                if (story.acts[story.acts.length - 1].sequences.length < 1) {
                    story.acts[story.acts.length - 1].sequences.push({
                        id: uuidV4(),
                        type: 'sequence',
                        text: 'Sequence',
                        level_text: '##',
                        image: undefined,
                        tokens: [],
                        scenes: []
                    });
                }

                if (story.acts[story.acts.length - 1].sequences[story.acts[story.acts.length - 1].sequences.length - 1].scenes.length < 1) {
                    story.acts[story.acts.length - 1].sequences[story.acts[story.acts.length - 1].sequences.length - 1].scenes.push({
                        id: uuidV4(),
                        type: 'scene',
                        text: 'Scene',
                        level_text: '###',
                        image: undefined,
                        tokens: [],
                        panels: []
                    });
                }

                delete token.level;
                story.acts[
                    story.acts.length - 1
                ].sequences[
                    story.acts[
                        story.acts.length - 1
                    ].sequences.length - 1
                ].scenes[
                    story.acts[
                        story.acts.length - 1
                    ].sequences[
                        story.acts[
                            story.acts.length - 1
                        ].sequences.length - 1
                    ].scenes.length - 1
                ].panels.push({
                    ... token,
                    id: uuidV4(),
                    type: 'panel'
                });
            }
        }
    }
    return story;
}

export const collateScriptCharactersWithCharacters = (script, characters) => {

    if(!script)
        return [];

    const tokens = tokenizeLines(lexizeScript(script));

    // extract the characters
    let extracted = [];
    for (const i in tokens) {
        const token = tokens[i];
        if (token.type=="character") {
            if(!_.findWhere(extracted, {text:token.text}))
                extracted.push(token);
        }
    };

    extracted = _.sortBy(extracted, 'text');

    // group into existing and non-existing
    let not_found=[];
    let existing=[];

    for (const i in extracted){
        const e = extracted[i];
        let found = undefined;
        let c;
        for(const j in characters) {
            c = characters[j];
            if(e.text == c.name.toUpperCase().trim()) {
                const c = characters[j];
                found = true;
                break;
            }
        }
        if(found===true) {
            if(!_.findWhere(existing, {name:e.text})) {
                existing.push({
                    name: e.text,
                    existing: c
                });
            }
        } else {
            if(!_.findWhere(not_found, {name:e.text})) {
                not_found.push({ name: e.text })
            }
        }
    }

    return { not_found, existing };
}

export const collateProjectScriptCharactersWithCharacters = (project, characters) => {
    let existing = [];
    let not_found = [];
    for (const i in project.stories){
        const story = project.stories[i];
        const collated = collateScriptCharactersWithCharacters(
            story.script,
            characters
        );
        existing = existing.concat(collated.existing);
        not_found = not_found.concat(collated.not_found);
    }
    return {
        not_found: _.sortBy(not_found, 'name'),
        existing: _.sortBy(existing, 'name')
    };
}

export const getScriptStats = (script) => {
    const tokens = tokenizeLines(lexizeScript(script));
    const story = convertTokensToStory(tokens);

    let stats = {
        acts: story.acts.length,
        panels: 0,
        duration_in_miliseconds: 0
    }

    let panelCount = 0;

    for (const actIndex in story.acts) {
        const act = story.acts[actIndex];
        for (const sequenceIndex in act.sequences){
            const sequence = act.sequences[sequenceIndex];
            for (const sceneIndex in sequence.scenes){
                const scene = sequence.scenes[sceneIndex];
                for (const panelIndex in scene.panels){
                    const panel = scene.panels[sceneIndex];
                    stats.panels++;
                    stats.duration_in_miliseconds += panel.duration_in_miliseconds;
                }
            }
        }
    }
    stats.display_duration = milisecondsToDuration(stats.duration_in_miliseconds);
    return stats;

}

export const parseFountainScript = (script) => {
    const tokens = tokenizeLines(lexizeScript(script));
    const markup = compileTokens(tokens);

    return { tokens, markup };
}
