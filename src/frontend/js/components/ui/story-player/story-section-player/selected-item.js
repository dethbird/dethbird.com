import React from 'react';
import {
    Card,
    Header,
    Container,
} from 'semantic-ui-react';

import { compileTokens } from 'utility/fountain-parser';

const SelectedItem = React.createClass({
    propTypes: {
        selectedItem: React.PropTypes.object.isRequired
    },

    renderHeader() {
        const { selectedItem } = this.props;
        // console.log(selectedItem);
        if (selectedItem.type == 'story') {
            return (
                <Header>{ selectedItem.title }</Header>
            )
        } else {
            return (
                <Header>{ selectedItem.level_text + ' ' + selectedItem.text }</Header>
            )
        }
    },
    render() {
        const { selectedItem } = this.props;

        return (
            <Container>
                { this.renderHeader() }
                <Card fluid className="fountain-container">
                    <div
                        className="fountain"
                        dangerouslySetInnerHTML={ {
                            __html: compileTokens(selectedItem.tokens)
                        } }
                    />
                </Card>
            </Container>
        )
    }
})

export default SelectedItem;
