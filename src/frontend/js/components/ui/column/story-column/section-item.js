import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const SectionItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        onSelectStoryItem: React.PropTypes.func.isRequired,
        selected: React.PropTypes.bool,
        highlighted: React.PropTypes.bool
    },
    render() {
        const { item, onSelectStoryItem, selected, highlighted } = this.props;

        return (
            <Card raised={ !selected } color={ highlighted ? "purple" : null } fluid onClick={ (e) => onSelectStoryItem(e, item)}>
                <Card.Content header={ item.level_text + ' ' + item.text } />
            </Card>
        )
    }
})

export default SectionItem;
