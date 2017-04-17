import React from 'react';
import {
    Card,
    Header,
    Container,
    Segment
} from 'semantic-ui-react';

import { compileTokens } from 'utility/fountain-parser';

const SelectedItem = React.createClass({
    propTypes: {
        selectedItem: React.PropTypes.object.isRequired
    },

    renderHeader() {
        const { selectedItem } = this.props;
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
            <Container text>

                <Card fluid className="fountain-container">
                    <Card.Header>
                        <Segment basic>
                            { this.renderHeader() }
                        </Segment>
                    </Card.Header>
                    <Card.Content>
                        <div
                            className="fountain"
                            dangerouslySetInnerHTML={ {
                                __html: compileTokens(selectedItem.tokens)
                            } }
                        />
                    </Card.Content>
                </Card>
            </Container>
        )
    }
})

export default SelectedItem;
