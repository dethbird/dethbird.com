import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const PanelItem = React.createClass({
    propTypes: {
        panel: React.PropTypes.object.isRequired
    },
    render() {
        const { panel } = this.props;

        return (
            <Card raised fluid>
                <Card.Content header={ panel.level_text + ' ' + panel.text } />
            </Card>
        )
    }
})

export default PanelItem;
