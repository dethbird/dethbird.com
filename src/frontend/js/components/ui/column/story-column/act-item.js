import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const ActItem = React.createClass({
    propTypes: {
        act: React.PropTypes.object.isRequired
    },
    render() {
        const { act } = this.props;

        return (
            <Card raised fluid>
                <Card.Content header={ act.level_text + ' ' + act.text } />
            </Card>
        )
    }
})

export default ActItem;
