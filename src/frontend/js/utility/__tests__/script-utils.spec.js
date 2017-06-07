import fs from 'fs';
import {
    convertTokensToStory,
    lexizeScript,
    tokenizeScript
} from 'utility/script-utils';
import { log } from 'utility/logger';

const dataDir = process.cwd() + '/src/frontend/js/utility/__tests__/data';

// example data
const scratchScript = fs.readFileSync(dataDir + '/scratch.fountain', 'utf8');

describe('fountainParser.tokenizeLines()', () => {
    test('lexize script', () => {
        const story = lexizeScript(scratchScript);
        log(story);
    });
    test.only('tokenize script', () => {
        const story = tokenizeScript(scratchScript);
        log(story);
    });
    test('tokenize script', () => {
        const tokens = tokenizeScript(scratchScript);
        const story = convertTokensToStory(tokens);
        log(story);
    });
});
