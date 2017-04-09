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
    render() {
        const { selectedItem } = this.props;
        console.log(selectedItem);
        return (
            <Container>
                <Header>{ selectedItem.level_text + ' ' + selectedItem.text }</Header>
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
