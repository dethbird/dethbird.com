import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const SequenceItem = React.createClass({
    propTypes: {
        sequence: React.PropTypes.object.isRequired
    },
    render() {
        const { sequence } = this.props;

        return (
            <Card fluid>
                <Card.Content header={ sequence.level_text + ' ' + sequence.text } />
            </Card>
        )
    }
})

export default SequenceItem;
