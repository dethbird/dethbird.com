import fountainParser from 'utility/fountain-parser';

describe.only('fountainParser', () => {
    test('parse', () => {
        const parsed = fountainParser.parse("INT. A PANTS STORT\n\nGOOBER\nI like pie.\n\nBUTTHOLEFACE\nMe toops");
        console.log(parsed);
        // expect(fields.username !== undefined);
        // expect(fields.username == null);
        // expect(fields.password !== undefined);
        // expect(fields.username == null);
    });
});
