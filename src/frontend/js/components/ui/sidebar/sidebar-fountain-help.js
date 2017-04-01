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
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Dialogue",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Parenthetical",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Dual Dialogue",
                content: (
                    <Segment>Farts</Segment>
                )
            },
            {
                title: "Lyrics",
                content: (
                    <Segment>Farts</Segment>
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
