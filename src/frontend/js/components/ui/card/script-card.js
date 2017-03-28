import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Image
} from 'semantic-ui-react';

const ScriptCard = React.createClass({
    propTypes: {
        script: React.PropTypes.object.isRequired
    },
    render() {
        const { script } = this.props;
        return (
            <Card onClick={ (e) => { browserHistory.push(`/script/${script.id}/edit`)} } >
                <Card.Content className="center aligned">
                    <Card.Header>{ script.name }</Card.Header>
                </Card.Content>
            </Card>
        );
    }
});

export default ScriptCard;
