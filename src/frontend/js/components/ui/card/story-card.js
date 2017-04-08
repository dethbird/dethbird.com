import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Image
} from 'semantic-ui-react';

const StoryCard = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired
    },
    render() {
        const { story } = this.props;
        return (
            <Card onClick={ (e) => { browserHistory.push(`/story/${story.id}/edit`)} } >
                <Card.Content className="center aligned">
                    <Card.Header>{ story.name }</Card.Header>
                </Card.Content>
            </Card>
        );
    }
});

export default StoryCard;
