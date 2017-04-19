import React from 'react';
import * as _ from 'underscore';
import {
    Accordion,
    Button,
    Dropdown,
    Icon,
    Segment,
    TextArea
} from 'semantic-ui-react';
import marked from 'marked';

import ScriptSnippet from 'components/ui/script-snippet';


const panels = [
    {
        title: "Title Page",
        content: {
            title: "Title Page",
            description: "The title page is always the first thing in a **.fountain** document. Information is encoded in the format `key`: `value`.",
            documentation_link: "https://fountain.io/syntax#section-titlepage",
            example: "Title:\n\tMy Story\nCredit: Written by\nAuthors: Steve Writington\nSource: Story by Jen Storyman\nNotes: Do not reproduce\nCopyright: 2017 Company\nDraft date: Jan 1, 1997\nContact:\n\tMy Company\n\t555 Threve St.\n\tNowhere, CA 93463"
        }
    },
    {
        title: "Sections",
        content: {
            title: "Sections",
            description: "Sections are useful for helping you organize your story into:\n\n - `#` acts\n - `##` sequences\n - `###` scenes\n - `####` panels.\n\n\n Of these, the _panel_ is significant because you can also add an image and duration to it.",
            documentation_link: "https://fountain.io/syntax#section-sections",
            example: "# Act 1\n\n= Synopsis for act 1\n\n## Sequence 1\n\n### Scene 1\n\n#### Panel 1\nhttps://c2.staticflickr.com/8/7300/11734597503_525df4ce2d_c.jpg\n00:10\n\nINT. The office\n\nDAVE\nIs it time to go home yet?\n\n#### Panel 2\n00:15\n\n[[ Not sure what happens here yet ]]\n\n#### Panel 3\n00:12\n\n[[ Not sure what happens here yet ]]\n\n"
        }
    },
    {
        title: "Character",
        content: {
            title: "Character",
            description: "A Character element is any line entirely in uppercase, with one empty line before it and without an empty line after it.\n\nUse the `@` symbol if you need to use lower case in the character name.\n\nUse a `^` at the end of the line to indicate dual-dialogue.",
            documentation_link: "https://fountain.io/syntax#section-character",
            example: "MARTIN (Covered in bees)\nAaaaa!!! Get 'em off!\n\nBUTTHEAD\n(pointing at MARTIN)\nYea yea\n\nBEAVIS (Exhuberantly) ^\nHeh heh\n\n@McBain\nWhat's the point of all this?"
        }
    },
    {
        title: "Dialogue",
        content: {
            title: "Dialogue",
            description: "Dialogue is any text following a Character name line.",
            documentation_link: "https://fountain.io/syntax#section-dialogue",
            example: "SANFORD\nDon't be a dummy."
        }
    },
    {
        title: "Dual Dialogue",
        content: {
            title: "Dual Dialogue",
            description: "Dual, or simultaneous, dialogue is expressed by adding a caret `^` after the second Character element.",
            documentation_link: "https://fountain.io/syntax#section-dual",
            example: "BRICK\nScrew retirement.\n\nSTEEL ^\nScrew retirement."
        }
    },
    {
        title: "Synopses",
        content: {
            title: "Synopses",
            description: "Synopses are optional blocks of text to describe a Section or scene.\n\nSynopses are single lines prefixed by an equals sign `=`.",
            documentation_link: "https://fountain.io/syntax#section-sections",
            example: "# ACT I\n\n= Set up the characters and the story.\n\nEXT. BRICK'S PATIO - DAY\n\n= This scene sets up Brick & Steel's new life as retirees. Warm sun, cold beer, and absolutely nothing to do.\n\nA gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something."
        }
    },
    {
        title: "Notes",
        content: {
            title: "Notes",
            description: "A Note is created by enclosing some text with double brackets `[[]]`. Notes can be inserted between lines, or in the middle of a line..",
            documentation_link: "https://fountain.io/syntax#section-notes",
            example: "They drink long and well from the beers.\n[[ Something like that ]]\n\nAnd then there's a long beat.\nLonger than is funny. [[ IS it funny? ]]\nLong enough to be depressing!"
        }
    },
    {
        title: "Parenthetical",
        content: {
            title: "Parenthetical",
            description: "Parentheticals follow a Character element, and are wrapped in parentheses `()`.",
            documentation_link: "https://fountain.io/syntax#section-paren",
            example: "STEEL\n(starting the engine)\nSo much for retirement!"
        }
    },
    {
        title: "Transition",
        content: {
            title: "Transition",
            description: "The requirements for Transition elements are:\n\n- Uppercase\n- Preceded by and followed by an empty line\n- Ending in `TO`:",
            documentation_link: "https://fountain.io/syntax#section-trans",
            example: "Jack begins to argue vociferously in Vietnamese (?), But mercifully we...\n\nCUT TO:\n\nEXT. BRICK'S POOL - DAY"
        }
    },
    {
        title: "Lyrics",
        content: {
            title: "Lyrics",
            description: "You create a Lyric by starting with a line with a tilde `~`.",
            documentation_link: "https://fountain.io/syntax#section-lyrics",
            example: "~Willy Wonka! Willy Wonka! The amazing chocolatier!\n~Willy Wonka! Willy Wonka! Everybody give a cheer!"
        }
    },
    {
        title: "Action",
        content: {
            title: "Action",
            description: "Action, or scene description, is any paragraph that doesn't meet criteria for another element.",
            documentation_link: "https://fountain.io/syntax#section-action",
            example: "They drink long and well from the beers.\n\nAnd then there's a long beat.\nLonger than is funny.\nLong enough to be depressing.\n\nThe men look at each other."
        }
    },
    {
        title: "Line Breaks",
        content: {
            title: "Line Breaks",
            description: "To force line breaks in action or dialogue, so that the next line is not interpreted as a new action, type `{two spaces}`.",
            documentation_link: "https://fountain.io/syntax#section-br",
            example: "DEALER\nTen.\nFour.\nDealer gets a seven.\n{two spaces}\nHit or stand sir?\n\nMONKEY\nDude, I'm a monkey."
        }
    },
    {
        title: "Page Breaks",
        content: {
            title: "Page Breaks",
            description: "Page Breaks are indicated by a line containing three or more consecutive equals signs `===`, and nothing more.",
            documentation_link: "https://fountain.io/syntax#section-pagebreaks",
            example: "The General Lee flies through the air. FREEZE FRAME.\n\nNARRATOR\nShoot, to the Dukes that's about like taking Grandma for a Sunday drive.\n\n>**End of Act One**<\n\n===\n\n>**Act Two**<\n\nThe General Lee hangs in the air, right where we left it.  The NARRATOR'S voice kicks in."
        }
    },
    {
        title: "Centered Text",
        content: {
            title: "Centered Text",
            description: "Centered text constitutes an Action element, and is bracketed with `>`/`<`:",
            documentation_link: "https://fountain.io/syntax#section-centered",
            example: "Stuff happened\n\n> THE END <"
        }
    },
    {
        title: "Emphasis",
        content: {
            title: "Emphasis",
            description: "Combine bold, italic and underlines",
            documentation_link: "https://fountain.io/syntax#section-emphasis",
            example: "*italics*\n**bold**\n***bold italics***\n_underline_"
        }
    }
];

const SidebarFountainHelp = React.createClass({
    getInitialState() {
        return {
            selectedOption: ''
        };
    },
    propTypes: {
        onClickSnippetInsert: React.PropTypes.func.isRequired
    },
    handleClickInsert(e, snippet ) {
        const { onClickSnippetInsert } = this.props;
        onClickSnippetInsert(e, snippet);
    },
    handleOnChange(e, payload) {
        this.setState({
            ... this.state,
            selectedOption: payload.value
        });
    },
    handleClickClose() {
        this.setState({
            ... this.state,
            selectedOption: ''
        });
    },
    renderContent(content) {
        const { handleClickClose } = this;
        return (
            <Segment>
                <Segment basic
                    dangerouslySetInnerHTML={ {
                        __html: marked(content.description)
                    } }
                />
                <ScriptSnippet snippet={ content.example } />
                <Segment basic textAlign="right">
                    <Button as="a" onClick={ handleClickClose } size="mini"><Icon name="close"/></Button>
                    <Button as="a" href={ content.documentation_link} target="_blank"  size="mini"><Icon name="external square"/> Docs</Button>
                    <Button as="a" color="teal" onClick={ (e)=> { this.handleClickInsert(e, content.example ) } }  size="mini">Insert <Icon name="angle double right"/></Button>
                </Segment>
            </Segment>
        );
    },
    renderSelectedOption() {
        const { renderContent } = this;
        const { selectedOption } = this.state;
        if (!selectedOption) {
            return null;
        }

        const option = _.findWhere(panels, {title: selectedOption});
        return renderContent(option.content);
    },
    render() {
        const { handleOnChange, renderSelectedOption } = this;
        const { selectedOption } = this.state;

        const dropdownItems = panels.map(function(panel){
            return {
                value: panel.title,
                text: panel.title
            };
        });
        return (
            <div>
                <Dropdown
                    placeholder='Select a definition'
                    search
                    fluid
                    selection
                    options={dropdownItems}
                    onChange={ handleOnChange }
                    value={ selectedOption }
                />
                { renderSelectedOption() }
            </div>
        )
    }
})

export default SidebarFountainHelp;
