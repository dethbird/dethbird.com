import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const SceneItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        onSelectStoryItem: React.PropTypes.func.isRequired
    },
    render() {
        const { item, onSelectStoryItem } = this.props;

        return (
            <Card raised fluid onClick={ (e) => onSelectStoryItem(e, item)}>
                <Card.Content header={ item.level_text + ' ' + item.text } />
            </Card>
        )
    }
})

export default SceneItem;
