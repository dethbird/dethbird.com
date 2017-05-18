import fs from 'fs';
import {
    lexizeScript
} from 'utility/script-utils';
import { log } from 'utility/logger';

const dataDir = process.cwd() + '/src/frontend/js/utility/__tests__/data';

// example data
const scratchScript = fs.readFileSync(dataDir + '/scratch.fountain', 'utf8');

describe('fountainParser.tokenizeLines()', () => {
    test.only('lexize script', () => {
        const story = lexizeScript(scratchScript);
        log(story);
    });
});
