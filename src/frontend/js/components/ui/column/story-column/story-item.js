import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const StoryItem = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired,
        onSelectStoryItem: React.PropTypes.func.isRequired
    },
    render() {
        const { story, onSelectStoryItem } = this.props;

        return (
            <Card raised fluid onClick={ (e) => onSelectStoryItem(e, {
                    type: 'story',
                    item: story
                })
            }>
                <Card.Content header={ story.title } />
            </Card>
        )
    }
})

export default StoryItem;
