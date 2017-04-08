import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const StoryItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        onSelectStoryItem: React.PropTypes.func.isRequired
    },
    render() {
        const { item, onSelectStoryItem } = this.props;

        return (
            <Card raised fluid onClick={ (e) => onSelectStoryItem(e, {
                    type: 'story',
                    item
                })
            }>
                <Card.Content header={ item.title } />
            </Card>
        )
    }
})

export default StoryItem;
