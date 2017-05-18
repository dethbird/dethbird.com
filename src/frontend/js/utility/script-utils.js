export const REGEX = {
    LEXER: {
        BONEYARD: /(^\/\*|^\*\/)$/g,
        SPLITTER: /\n/g,
        CLEANER: /^\n+|\n+$/,
        STANDARDIZER: /\r\n|\r/g,
        WHITESPACER: /^\t+|^ {3,}/gm
    }
}


export const lexizeScript = (script) => {
    const lines = script
        .replace(REGEX.LEXER.STANDARDIZER, '\n')
        .replace(REGEX.LEXER.CLEANER, '')
        .replace(REGEX.LEXER.WHITESPACER, '')
        .split(REGEX.LEXER.SPLITTER);
    const lex = lines.map(function(line, i){
        if (line)
            return {line, index: i};
        return {line: '\n', index: i};
    });
    return lex;
};
