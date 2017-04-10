import React from 'react';
import classNames from 'classnames';
import {
    Card,
    Grid,
    Header,
    Icon
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
                <Header>{ item.title }</Header>
            )
        } else {
            return (
                <Header as={ 'h' + (item.level_text.length + 1) }>{ item.level_text + ' ' + item.text }</Header>
            )
        }
    },
    render() {
        const { item, onSelectStoryItem, selected, highlighted, playing } = this.props;
        const className = classNames([
            selected && !playing ? 'card-selected' : null,
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
                <Card.Content>
                    <Grid>
                        <Grid.Column width={ 10 }>
                            { this.renderHeader() }
                        </Grid.Column>
                        <Grid.Column width={ 6 } textAlign="right">
                            <Icon name="time" /><span>{ item.duration }</span>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }
})

export default SectionItem;
