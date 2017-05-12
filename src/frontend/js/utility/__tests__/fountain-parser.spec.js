import fs from 'fs';
import {
    convertTokensToStory,
    compileTokens,
    lexizeScript,
    parseFountainScript,
    tokenizeLines,
    getScriptStats
} from 'utility/fountain-parser';
import { log } from 'utility/logger';

const dataDir = process.cwd() + '/src/frontend/js/utility/__tests__/data';

// example data
const exampleCharacters = fs.readFileSync(dataDir + '/characters.fountain', 'utf8');
const exampleDialogue = fs.readFileSync(dataDir + '/dialogue.fountain', 'utf8');
const exampleLyrics = fs.readFileSync(dataDir + '/lyrics.fountain', 'utf8');
const exampleNotes = fs.readFileSync(dataDir + '/notes.fountain', 'utf8');
const examplePageBreaks = fs.readFileSync(dataDir + '/page_break.fountain', 'utf8');
const exampleSceneHeadings = fs.readFileSync(dataDir + '/scene_headings.fountain', 'utf8');
const exampleSections = fs.readFileSync(dataDir + '/sections.fountain', 'utf8');
const exampleSectionsWithMetadata = fs.readFileSync(dataDir + '/sections-metadata.fountain', 'utf8');
const exampleTitlePage = fs.readFileSync(dataDir + '/title_page.fountain', 'utf8');
const exampleTransitions = fs.readFileSync(dataDir + '/transitions.fountain', 'utf8');
const scratchScript = fs.readFileSync(dataDir + '/scratch.fountain', 'utf8');

describe('fountainParser.tokenizeLines()', () => {
    test('tokenize dialogue', () => {
        const tokens = tokenizeLines(lexizeScript(exampleDialogue));
        console.log(tokens);
    });
    test('tokenize page_breaks', () => {
        const tokens = tokenizeLines(lexizeScript(examplePageBreaks));
        console.log(tokens);
    });
    test('tokenize notes', () => {
        const tokens = tokenizeLines(lexizeScript(exampleNotes));
        console.log(tokens);
    });
    test('tokenize scene_headings', () => {
        const tokens = tokenizeLines(lexizeScript(exampleSceneHeadings));
        console.log(tokens);
    });
    test('tokenize sections', () => {
        const tokens = tokenizeLines(lexizeScript(exampleSections));
        console.log(tokens);
    });
    test('tokenize title_page', () => {
        const tokens = tokenizeLines(lexizeScript(exampleTitlePage));
        console.log(tokens);
    });
    test('tokenize transitions', () => {
        const tokens = tokenizeLines(lexizeScript(exampleTransitions));
        console.log(tokens);
    });

    test('compile dialogue', () => {
        const compiled = parseFountainScript(exampleDialogue);
        console.log(compiled);
    });
    test('compile characters', () => {
        const compiled = parseFountainScript(exampleCharacters);
        console.log(compiled);
    });
    test('compile lyrics', () => {
        const compiled = parseFountainScript(exampleLyrics);
        console.log(compiled);
    });
    test('compile title page', () => {
        const compiled = parseFountainScript(exampleTitlePage);
        console.log(compiled);
    });
    test('compile sections', () => {
        const compiled = parseFountainScript(exampleSections);
        console.log(compiled);
    });
    test('compile sections with metadata', () => {
        const compiled = parseFountainScript(exampleSectionsWithMetadata);
        console.dir(compiled);
    });


    test.only('convert tokens to story', () => {
        const story = getScriptStats(scratchScript);
        // log(story);
    });
});
