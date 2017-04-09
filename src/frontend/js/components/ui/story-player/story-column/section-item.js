import React from 'react';
import classNames from 'classnames';
import {
    Card
} from 'semantic-ui-react';


const SectionItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        onSelectStoryItem: React.PropTypes.func.isRequired,
        selected: React.PropTypes.bool,
        highlighted: React.PropTypes.bool,
        playing: React.PropTypes.bool
    },
    renderHeader() {
        const { item } = this.props;
        if (item.type == 'story') {
            return (
                <Card.Content header={ item.title } />
            )
        } else {
            return (
                <Card.Content header={ item.level_text + ' ' + item.text } />
            )
        }
    },
    render() {
        const { item, onSelectStoryItem, selected, highlighted, playing } = this.props;
        const className = classNames([
            selected && !playing ? 'card-selected' : null ,
            playing ? 'card-playing' : null ,
            highlighted && !playing ? 'card-highlighted' : null
        ]);

        let color = highlighted ? 'purple' : null;
        color = playing ? 'orange' : color;

        return (
            <Card
                raised={ selected===false }
                color={ color }
                fluid
                onClick={ (e) => onSelectStoryItem(e, item)}
                className={ className }
            >
                { this.renderHeader() }
                <Card.Content extra>{ item.duration }</Card.Content>
            </Card>
        )
    }
})

export default SectionItem;
