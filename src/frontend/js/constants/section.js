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
    IMAGE: /^(https:\/\/(.+)?.(jpg|jpeg|gif|png|svg))/i,
    DURATION: /^([0-9]?[0-9]:[0-9][0-9])/,
    LYRICS: /^(?:~)([\S\s]+)/,
    NOTE: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\]+))$/g,
    NOTE_MULTILINE_START: /^(?:\[{2})([\S\s]+)$/g,
    NOTE_MULTILINE: /^(?!\[{2})(.+[^\]{2})])$/g,
    NOTE_MULTILINE_END: /^(.+)(?:\]{2})$/g,
    PAGE_BREAK: /^\={3,}$/,
    SCENE: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
    SCENE_NUMBER: /( *#(.+)# *)/,
    SECTION: /^(#{1,4})\ (.*)/,
    SYNOPSIS: /^(?:\=(?!\=+) *)(.*)/,
    TITLE: /^((?:title|credit|author[s]?|source|notes|draft date|date|contact|copyright)\:)/gim,
    TRANSITION: /^((?:FADE (?:TO BLACK|OUT)|CUT TO BLACK)\.|.+ TO\:)/i,
    TRANSITION_POWER_USER: /^(?:> )(.+)/i
}

export const REGEX_INLINE = {
    NOTE: /(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\]+))/g,
    BOLD: /(?:\*{2})(.+)(?:\*{2})/g,
    UNDERLINE: /(?:\_{1})(.+)(?:\_{1})/g,
    PARENTHETICAL: /(?:\({1})(.+)(?:\){1})/g,
    TWO_SPACES: /{two spaces}/g
}

export const SECTION_LEVEL = {
    1: "act",
    2: "sequence",
    3: "scene",
    4: "panel"
};
