import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const StoryItem = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired
    },
    render() {
        const { story } = this.props;

        return (
            <Card raised fluid>
                <Card.Content header={ story.title } />
            </Card>
        )
    }
})

export default StoryItem;
