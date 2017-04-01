import React from 'react';
import {
    Accordion,
    Button,
    Icon,
    Segment,
    TextArea
} from 'semantic-ui-react';

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
                <p>{ content.description }</p>
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
                title: "Character",
                content: (
                    renderContent({
                        title: "Character",
                        description: "A Character element is any line entirely in uppercase, with one empty line before it and without an empty line after it. Use the \"@\" symbol if you need to use lower case in the character name.",
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
                title: "Parenthetical",
                content: (
                    renderContent({
                        title: "Parenthetical",
                        description: "Parentheticals follow a Character element, and are wrapped in parentheses \"()\".",
                        documentation_link: "https://fountain.io/syntax#section-paren",
                        example: "STEEL\n(starting the engine)\nSo much for retirement!"
                    })
                )
            },
            {
                title: "Dual Dialogue",
                content: (
                    renderContent({
                        title: "Dual Dialogue",
                        description: "Dual, or simultaneous, dialogue is expressed by adding a caret \"^\" after the second Character element.",
                        documentation_link: "https://fountain.io/syntax#section-dual",
                        example: "BRICK\nScrew retirement.\n\nSTEEL ^\nScrew retirement."
                    })
                )
            },
            {
                title: "Lyrics",
                content: (
                    renderContent({
                        title: "Lyrics",
                        description: "You create a Lyric by starting with a line with a tilde \"~\".",
                        documentation_link: "https://fountain.io/syntax#section-dual",
                        example: "~Willy Wonka! Willy Wonka! The amazing chocolatier!\n~Willy Wonka! Willy Wonka! Everybody give a cheer!"
                    })
                )
            },
            {
                title: "Transition",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Centered Text",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Emphasis",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Title Page",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Page Breaks",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Punctuation",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Line Breaks",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Notes",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Sections",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Synopses",
                content: (
                    <Segment>Farts</Segment>
                )
            }
        ];
        return (
            <Accordion panels={panels} inverted/>
        )
    }
})

export default SidebarFountainHelp;
