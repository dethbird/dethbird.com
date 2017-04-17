import React from 'react';
import {
    Accordion,
    Button,
    Icon,
    Segment,
    TextArea
} from 'semantic-ui-react';
import marked from 'marked';

import ScriptSnippet from 'components/ui/script-snippet';

const SidebarFountainHelp = React.createClass({
    propTypes: {
        onClickSnippetInsert: React.PropTypes.func.isRequired
    },
    handleClickInsert(e, snippet ) {
        const { onClickSnippetInsert } = this.props;
        onClickSnippetInsert(e, snippet);
    },
    renderContent(content) {
        return (
            <Segment>
                <h3>{ content.title }</h3>
                <Segment basic
                    dangerouslySetInnerHTML={ {
                        __html: marked(content.description)
                    } }
                />
                <ScriptSnippet snippet={ content.example } />
                <Segment basic textAlign="right">
                    <Button as="a" href={ content.documentation_link} target="_blank"><Icon name="external square"/> Docs</Button>
                    <Button as="a" color="teal" onClick={ (e)=> { this.handleClickInsert(e, content.example ) } } >Insert <Icon name="angle double right"/></Button>
                </Segment>
            </Segment>
        );
    },
    render() {
        const { renderContent } = this;
        const panels = [
            {
                title: "Title Page",
                content: (
                    renderContent({
                        title: "Title Page",
                        description: "The optional Title Page is always the first thing in a Fountain document. Information is encoding in the format `key`: `value`.",
                        documentation_link: "https://fountain.io/syntax#section-titlepage",
                        example: "Title:\n\t_**BRICK & STEEL**_\n\t_**FULL RETIRED**_\nCredit: Written by\nAuthors: Stu Maschwitz, Don Dovip\nSource: Story by KTM\nNotes: Do not reproduce\nCopyright: 2017 Explosioncorp LLC\nDraft date: 1/20/2012\nContact:\n\tNext Level Productions\n\t1588 Mission Dr.\n\tSolvang, CA 93463"
                    })
                )
            },
            {
                title: "Sections",
                content: (
                    renderContent({
                        title: "Sections",
                        description: "Sections are optional markers for managing the structure of a story.",
                        documentation_link: "https://fountain.io/syntax#section-sections",
                        example: "# Act\n\n## Sequence\n\n### Scene\n\n## Another Sequence\n\n### Another scene\n\n# Another Act"
                    })
                )
            },
            {
                title: "Character",
                content: (
                    renderContent({
                        title: "Character",
                        description: "A Character element is any line entirely in uppercase, with one empty line before it and without an empty line after it.\n\n Use the `@` symbol if you need to use lower case in the character name.",
                        documentation_link: "https://fountain.io/syntax#section-character",
                        example: "MARTIN (Covered in bees)\nAaaaa!!! Get 'em off!\n\nBUTTHEAD\n(pointing at MARTIN)\nYea yea\n\nBEAVIS (Exhuberantly) ^\nHeh heh\n\n@McBain\nWhat's the point of all this?"
                    })
                )
            },
            {
                title: "Dialogue",
                content: (
                    renderContent({
                        title: "Dialogue",
                        description: "Dialogue is any text following a Character or Parenthetical element.",
                        documentation_link: "https://fountain.io/syntax#section-dialogue",
                        example: "SANBORN\nA good 'ole boy. You know, loves the Army, blood runs green. Country boy. Seems solid."
                    })
                )
            },
            {
                title: "Dual Dialogue",
                content: (
                    renderContent({
                        title: "Dual Dialogue",
                        description: "Dual, or simultaneous, dialogue is expressed by adding a caret `^` after the second Character element.",
                        documentation_link: "https://fountain.io/syntax#section-dual",
                        example: "BRICK\nScrew retirement.\n\nSTEEL ^\nScrew retirement."
                    })
                )
            },
            {
                title: "Synopses",
                content: (
                    renderContent({
                        title: "Synopses",
                        description: "Synopses are optional blocks of text to describe a Section or scene.\n\nSynopses are single lines prefixed by an equals sign `=`.",
                        documentation_link: "https://fountain.io/syntax#section-sections",
                        example: "# ACT I\n\n= Set up the characters and the story.\n\nEXT. BRICK'S PATIO - DAY\n\n= This scene sets up Brick & Steel's new life as retirees. Warm sun, cold beer, and absolutely nothing to do.\n\nA gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something."
                    })
                )
            },
            {
                title: "Notes",
                content: (
                    renderContent({
                        title: "Notes",
                        description: "A Note is created by enclosing some text with double brackets `[[]]`. Notes can be inserted between lines, or in the middle of a line..",
                        documentation_link: "https://fountain.io/syntax#section-notes",
                        example: "They drink long and well from the beers.\n[[ Something like that ]]\n\nAnd then there's a long beat.\nLonger than is funny. [[ IS it funny? ]]\nLong enough to be depressing!"
                    })
                )
            },
            {
                title: "Parenthetical",
                content: (
                    renderContent({
                        title: "Parenthetical",
                        description: "Parentheticals follow a Character element, and are wrapped in parentheses `()`.",
                        documentation_link: "https://fountain.io/syntax#section-paren",
                        example: "STEEL\n(starting the engine)\nSo much for retirement!"
                    })
                )
            },
            {
                title: "Transition",
                content: (
                    renderContent({
                        title: "Transition",
                        description: "The requirements for Transition elements are:\n\n- Uppercase\n- Preceded by and followed by an empty line\n- Ending in `TO`:",
                        documentation_link: "https://fountain.io/syntax#section-trans",
                        example: "Jack begins to argue vociferously in Vietnamese (?), But mercifully we...\n\nCUT TO:\n\nEXT. BRICK'S POOL - DAY"
                    })
                )
            },
            {
                title: "Lyrics",
                content: (
                    renderContent({
                        title: "Lyrics",
                        description: "You create a Lyric by starting with a line with a tilde `~`.",
                        documentation_link: "https://fountain.io/syntax#section-lyrics",
                        example: "~Willy Wonka! Willy Wonka! The amazing chocolatier!\n~Willy Wonka! Willy Wonka! Everybody give a cheer!"
                    })
                )
            },
            {
                title: "Action",
                content: (
                    renderContent({
                        title: "Action",
                        description: "Action, or scene description, is any paragraph that doesn't meet criteria for another element.",
                        documentation_link: "https://fountain.io/syntax#section-action",
                        example: "They drink long and well from the beers.\n\nAnd then there's a long beat.\nLonger than is funny.\nLong enough to be depressing.\n\nThe men look at each other."
                    })
                )
            },
            {
                title: "Line Breaks",
                content: (
                    renderContent({
                        title: "Line Breaks",
                        description: "To force line breaks in action or dialogue, so that the next line is not interpreted as a new action, type `{two spaces}`.",
                        documentation_link: "https://fountain.io/syntax#section-br",
                        example: "DEALER\nTen.\nFour.\nDealer gets a seven.\n{two spaces}\nHit or stand sir?\n\nMONKEY\nDude, I'm a monkey."
                    })
                )
            },
            {
                title: "Page Breaks",
                content: (
                    renderContent({
                        title: "Page Breaks",
                        description: "Page Breaks are indicated by a line containing three or more consecutive equals signs `===`, and nothing more.",
                        documentation_link: "https://fountain.io/syntax#section-pagebreaks",
                        example: "The General Lee flies through the air. FREEZE FRAME.\n\nNARRATOR\nShoot, to the Dukes that's about like taking Grandma for a Sunday drive.\n\n>**End of Act One**<\n\n===\n\n>**Act Two**<\n\nThe General Lee hangs in the air, right where we left it.  The NARRATOR'S voice kicks in."
                    })
                )
            },
            {
                title: "Centered Text",
                content: (
                    renderContent({
                        title: "Centered Text",
                        description: "Centered text constitutes an Action element, and is bracketed with `>`/`<`:",
                        documentation_link: "https://fountain.io/syntax#section-centered",
                        example: "Stuff happened\n\n> THE END <"
                    })
                )
            },
            {
                title: "Emphasis",
                content: (
                    renderContent({
                        title: "Emphasis",
                        description: "Combine bold, italic and underlines",
                        documentation_link: "https://fountain.io/syntax#section-emphasis",
                        example: "*italics*\n**bold**\n***bold italics***\n_underline_"
                    })
                )
            }
        ];
        return (
            <Accordion panels={panels}/>
        )
    }
})

export default SidebarFountainHelp;
