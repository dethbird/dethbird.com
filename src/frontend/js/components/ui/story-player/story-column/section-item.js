import React from 'react';
import classNames from 'classnames';
import {
    Card,
    Grid,
    Header,
    Image,
    Icon
} from 'semantic-ui-react';
import {
    millisecondsToDuration
} from 'utility/script-utils';


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
        console.log(item);
        if(item.model) {
            return (
                <Header as={ 'h' + (item.model.level + 1) }>
                    farts
                </Header>
            )
        }
    },
    renderImage() {
        const { item } = this.props;
        if (item.model){
            return (
                <Image src={ item.model.image || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } size='medium' verticalAlign='middle' shape={ (item.model.level == 4) ? null : 'circular' } />
            )
        }

    },
    render() {
        const { item, onSelectStoryItem, selected, highlighted, playing } = this.props;
        const className = classNames([
            selected && !playing ? 'card-selected' : null,
            playing ? 'card-playing' : null ,
            highlighted && !playing ? 'card-highlighted' : null,
            'story-player-column-item'
        ]);

        let color = highlighted ? 'purple' : null;
        color = playing ? 'orange' : color;
        console.log(item);
        return (
            <Card
                raised={ selected===false }
                color={ color }
                fluid
                onClick={ (e) => onSelectStoryItem(e, item) }
                className={ className }
            >
                    <Grid>
                        <Grid.Column width={ 6 } textAlign="left" >
                            { this.renderHeader() }
                        </Grid.Column>
                        <Grid.Column width={ 3 } textAlign="right">
                            { this.renderImage() }
                        </Grid.Column>
                        <Grid.Column width={ 7 } textAlign="right">
                            <Icon name="time" /><span>{ millisecondsToDuration(item.duration_in_milliseconds) }</span>
                        </Grid.Column>
                    </Grid>
            </Card>
        )
    }
})

export default SectionItem;
