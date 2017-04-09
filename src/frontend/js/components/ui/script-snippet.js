import React from 'react';
import {
    Menu,
    Segment
} from 'semantic-ui-react';

import { parseFountainScript } from 'utility/fountain-parser';

const ScriptSnippet = React.createClass({
    getInitialState() {
        return {
            activeItem: "fountain"
        }
    },
    handleItemClick(e, { name }) {
        this.setState(
            { activeItem: name }
        );
    },
    propTypes: {
        snippet: React.PropTypes.string.isRequired
    },
    renderContent() {
        const { snippet } = this.props;
        const { activeItem } = this.state;

        if (activeItem=="fountain") {
            return (
                <Segment attached="top" className="script-input">
                    { snippet }
                </Segment>
            );
        } else {
            const parsed = parseFountainScript(snippet);
            return (
                <Segment attached="top" className="fountain-container">
                    <div
                        className="fountain"
                        dangerouslySetInnerHTML={ {
                            __html: parsed.markup
                        } }
                    />
                </Segment>
            );
        }

    },
    render() {
        const { snippet } = this.props;
        const { activeItem } = this.state;
        return (
            <div>
                { this.renderContent() }
                <Menu attached='bottom' tabular>
                    <Menu.Item name='fountain' active={ activeItem=="fountain" } onClick={ this.handleItemClick }>
                        .fountain
                    </Menu.Item>

                    <Menu.Item name='rendered' active={ activeItem=="rendered" } onClick={ this.handleItemClick }>
                        rendered
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
})

export default ScriptSnippet;
