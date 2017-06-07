import uuidV4 from 'uuid/v4';
import { log } from 'utility/logger';
import * as _ from 'underscore';
import pad from 'pad-left';
import { REGEX } from 'constants/section';
import moment from 'moment';

export const durationToMilliseconds = (duration) => {
    if(typeof duration !== 'string')
        return 0;

    const parts = duration.split(':').reverse();
    let seconds = 0, i;

    for(i in parts)
        seconds = seconds + (parseInt(parts[i]) * Math.pow(60, i));

    return seconds * 1000;
}

export const millisecondsToDuration = (milliseconds) => {
    let duration = moment.duration(milliseconds);
    return [pad(duration.get('hours'), 2, '0'), pad(duration.get('minutes'), 2, '0'), pad(duration.get('seconds'), 2, '0')].join(':');
}

export const collateProjectScriptCharactersWithCharacters = (stories, characters) => {
    let existing = [];
    let not_found = [];
    for (const i in stories){
        const story = stories[i];
        const tokens = tokenizeScript(story.script);
        const collated = collateScriptCharacterTokensWithCharacters(
            tokens.characters,
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


export const collateScriptCharacterTokensWithCharacters = (scriptCharacters, characters) => {

    let not_found=[];
    let existing=[];

    for (const i in scriptCharacters){
        const e = scriptCharacters[i];
        let found = undefined;
        let c;
        for(const j in characters) {
            c = characters[j];
            if(e.name == c.name.toUpperCase().trim()) {
                const c = characters[j];
                found = true;
                break;
            }
        }
        if(found===true) {
            if(!_.findWhere(existing, {name:e.name})) {
                existing.push({
                    name: e.name,
                    existing: c
                });
            }
        } else {
            if(!_.findWhere(not_found, {name:e.name})) {
                not_found.push({ name: e.name })
            }
        }
    }

    return { not_found, existing };
}

export const convertTokensToStory = (tokens) => {
    let story = {
        id: 'story-0',
        acts: [],
        duration_in_milliseconds: 0
    };
    let currentSection = 'act';

    for (const i in tokens.scriptTokens) {
        const token = tokens.scriptTokens[i];
        if (token.type == 'section') {
            if(token.model.level == 1) {
                story.acts.push({
                    ... token,
                    tokens: [token],
                    sequences: []
                });
                currentSection = 'act';
            }
            if (token.model.level == 2) {
                // new act
                if (story.acts.length < 1) {
                    story.acts.push({
                        id: uuidV4(),
                        model: {
                            identifier: '#',
                            level: 1,
                            text: ['Act']
                        },
                        tokens: [],
                        sequences: []
                    });
                }

                story.acts[
                    story.acts.length - 1
                ].sequences.push({
                    ... token,
                    tokens: [token],
                    scenes: []
                });
                currentSection = 'sequence';
            }
            if (token.model.level == 3) {
                token.panels = [];

                // new act
                if (story.acts.length < 1) {
                    story.acts.push({
                        id: uuidV4(),
                        model: {
                            identifier: '#',
                            level: 1,
                            text: ['Act']
                        },
                        tokens: [],
                        sequences: []
                    });
                }

                // new sequence
                if (story.acts[story.acts.length - 1].sequences.length < 1) {
                    story.acts[story.acts.length - 1].sequences.push({
                        id: uuidV4(),
                        model: {
                            identifier: '##',
                            level: 2,
                            text: ['Seqence']
                        },
                        tokens: [],
                        scenes: []
                    });
                }

                story.acts[
                    story.acts.length - 1
                ].sequences[
                    story.acts[
                        story.acts.length - 1
                    ].sequences.length - 1
                ].scenes.push({
                    ... token,
                    tokens: [token],
                    panels: []
                });

                currentSection = 'scene';
            }
            if (token.model.level == 4) {

                // new act
                if (story.acts.length < 1) {
                    story.acts.push({
                        id: uuidV4(),
                        model: {
                            identifier: '#',
                            level: 1,
                            text: ['Act']
                        },
                        tokens: [],
                        sequences: []
                    });
                }

                // new sequence
                if (story.acts[story.acts.length - 1].sequences.length < 1) {
                    story.acts[story.acts.length - 1].sequences.push({
                        id: uuidV4(),
                        model: {
                            identifier: '##',
                            level: 2,
                            text: ['Seqence']
                        },
                        tokens: [],
                        scenes: []
                    });
                }

                // new scene
                if (story.acts[story.acts.length - 1].sequences[story.acts[story.acts.length - 1].sequences.length - 1].scenes.length < 1) {
                    story.acts[story.acts.length - 1].sequences[story.acts[story.acts.length - 1].sequences.length - 1].scenes.push({
                        id: uuidV4(),
                        model: {
                            identifier: '###',
                            level: 3,
                            text: ['Scene']
                        },
                        tokens: [],
                        panels: []
                    });
                }

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
                    tokens: [token]
                });

                currentSection = 'panel';
            }
        } else {
            if(currentSection == 'act'){
                if(story.acts[story.acts.length - 1]){
                    story.acts[
                        story.acts.length - 1
                    ].tokens.push(token);
                }
            }
            if(currentSection == 'sequence'){
                story.acts[
                    story.acts.length - 1
                ].sequences[
                    story.acts[
                        story.acts.length - 1
                    ].sequences.length - 1
                ].tokens.push(token);
            }
            if(currentSection == 'scene'){
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
                ].tokens.push(token);
            }
            if(currentSection == 'panel'){
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
                ].panels[
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
                    ].panels.length - 1
                ].tokens.push(token);
            }
        }
    }

    // calculate durations
    let _story = {
        ... story,
        duration_in_milliseconds: 0,
        acts: [],
        stats: {
            acts: 0,
            panels: 0
        }
    };
    for (const actIndex in story.acts) {
        let act = story.acts[actIndex];
        let _act = { ... act, sequences: [], duration_in_milliseconds: 0};
        _story.stats.acts += 1;
        for (const sequenceIndex in story.acts[actIndex].sequences) {
            let sequence = story.acts[actIndex].sequences[sequenceIndex];
            let _sequence = { ... sequence, scenes: [], duration_in_milliseconds: 0};
            for (const sceneIndex in story.acts[actIndex].sequences[sequenceIndex].scenes) {
                let scene = story.acts[actIndex].sequences[sequenceIndex].scenes[sceneIndex];
                let _scene = { ... scene, panels: [], duration_in_milliseconds: 0};
                for (const panelIndex in story.acts[actIndex].sequences[sequenceIndex].scenes[sceneIndex].panels) {
                    let panel = story.acts[actIndex].sequences[sequenceIndex].scenes[sceneIndex].panels[panelIndex];
                    let _panel = panel;
                    _panel.duration_in_milliseconds = durationToMilliseconds(panel.model.duration);
                    _scene.duration_in_milliseconds = _scene.duration_in_milliseconds + _panel.duration_in_milliseconds;
                    _scene.panels.push(_panel);
                    _story.stats.panels += 1;
                }
                _sequence.duration_in_milliseconds = _sequence.duration_in_milliseconds + _scene.duration_in_milliseconds;
                _sequence.scenes.push(_scene);
            }
            _act.duration_in_milliseconds = _act.duration_in_milliseconds + _sequence.duration_in_milliseconds;
            _act.sequences.push(_sequence);
        }
        _story.duration_in_milliseconds = _story.duration_in_milliseconds + _act.duration_in_milliseconds;
        _story.acts.push(_act);
    }

    return _story;
}

export const tokenizeScript = (script) => {
    const lines = lexizeScript(script);

    let titleTokens = [];
    let scriptTokens = [];
    let characterCounts = [];
    let duration_in_milliseconds = 0;
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        let match = false;
        let token = {
            id: 'token-' + i,
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

                    while (dialogueLine) {
                        if (dialogueLine.text !== '\n') {
                            token.lines.push(dialogueLine);
                            token.model.text.push(dialogueLine.text);
                            nextIndex++;
                            dialogueLine = lines[nextIndex];
                        } else {
                            break;
                        }
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
                text: [ match[2] ],
                image: undefined,
                duration: undefined,
                milestones: []
            }
            let nextIndex = parseInt(i)+1;
            if (lines.length > nextIndex) {
                let nextLine = lines[nextIndex];
                if (nextLine.text !== '\n') {
                    while (nextLine.text !== '\n') {
                        token.lines.push(nextLine);
                        if (match[1].length == 4) {
                            let lineMatch;
                            lineMatch = nextLine.text.match(REGEX.IMAGE_AND_DURATION);
                            if(lineMatch) {
                                token.model.image = lineMatch[1];
                                token.model.duration = lineMatch[2];
                                duration_in_milliseconds += durationToMilliseconds(token.model.duration);
                            } else if (REGEX.IMAGE.test(nextLine.text)){
                                token.model.image = nextLine.text.trim()
                            } else if(REGEX.DURATION.test(nextLine.text)){
                                token.model.duration = nextLine.text.trim()
                                duration_in_milliseconds += durationToMilliseconds(token.model.duration);
                            }
                            lineMatch = nextLine.text.match(REGEX.MILESTONE);
                            if(lineMatch) {
                                token.model.milestones.push(lineMatch[1]);
                            }
                        }
                        nextIndex++;
                        nextLine = lines[nextIndex];
                        if (nextLine==undefined)
                            break;
                    }
                    i = nextIndex - 1;
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
            let note = match[0];
            note = note.substring(2, note.length-2);
            token.model = {
                text: [note.trim()]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.NOTE_MULTILINE_START);
        if (match) {
            token.lines.push(line);
            token.type = 'note';
            token.model = {
                text: [match[0].substring(2, match[0].length).trim()]
            };

            let nextIndex = parseInt(i)+1;
            if (lines.length > nextIndex) {
                let nextLine = lines[nextIndex];
                if (nextLine.text !== '\n') {
                    while (nextLine.text !== '\n') {
                        token.lines.push(nextLine);
                        match = nextLine.text.match(REGEX.NOTE_MULTILINE);
                        if(match){
                            token.model.text.push(match[0]);
                        }
                        match = nextLine.text.match(REGEX.NOTE_MULTILINE_END);
                        if(match){
                            token.model.text.push(match[0].substring(0, match[0].length - 2).trim());
                        }
                        nextIndex++;
                        nextLine = lines[nextIndex];
                        if (nextLine==undefined)
                            break;
                    }
                    i = nextIndex - 1;
                }
            }
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
                text: [line.text.trim()]
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
                text: [line.text.trim()]
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
                text: [line.text.trim()]
            };
            scriptTokens.push(token);
            i++;
            continue;
        }

        match = line.text.match(REGEX.TRANSITION_POWER_USER);
        if (match) {
            token.lines.push(line);
            token.type = 'transition';
            token.model = {
                text: [line.text.substring(2, line.text.length).trim()]
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
                        if (nextLine==undefined)
                            break;
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
                        if (nextLine==undefined)
                            break;

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
    let lastDual = false;
    while (i < scriptTokens.length) {
        const token = scriptTokens[i];
        if( token.type=='dialogue' || token.type=='blank_line') {
            _scriptTokens.push(token);

            if ( token.type == 'dialogue' ) {
                if (characterCounts[token.model.character]==undefined) {
                    characterCounts[token.model.character] = 1;
                } else {
                    characterCounts[token.model.character]++;
                }
                let isDual = token.model.dual;
                if (lastDual) {
                    token.model.dual = true;
                }
                lastDual = isDual;
            }
        } else {
            lastDual = false;
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
        characters,
        duration_in_milliseconds
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
