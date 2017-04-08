import React from 'react';
import {
    Container,
    Grid
} from 'semantic-ui-react';

import StoryItem from 'components/ui/story-player/story-column/story-item';
import SectionItem from 'components/ui/story-player/story-column/section-item';

const StoryColumn = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired,
        selectedItem: React.PropTypes.object.isRequired,
        onSelectStoryItem: React.PropTypes.func
    },
    handleOnSelectStoryItem(e, payload) {
        const { onSelectStoryItem } = this.props;
        if (onSelectStoryItem) {
            onSelectStoryItem(e, payload);
        }
    },
    renderStoryNodes() {
        const { handleOnSelectStoryItem } = this;
        const { story, selectedItem } = this.props;

        if (!story.acts) {
            return null;
        }
        let nodes = [];
        let actIndex, sequenceIndex, sceneIndex, panelIndex, key = 0;
        let activeSelection = false;

        activeSelection = selectedItem.id == story.id;
        nodes.push(
            <Grid.Row key={ key } className="story-item">
                <StoryItem
                    item={ story }
                    onSelectStoryItem={ handleOnSelectStoryItem }
                    selected={ selectedItem.id == story.id }
                    highlighted={ activeSelection }
                />
            </Grid.Row>);
        for (actIndex in story.acts) {
            key ++;
            const act = story.acts[actIndex];
            activeSelection = selectedItem.id == story.id;
            activeSelection = activeSelection ? activeSelection : selectedItem.id == act.id;
            nodes.push(
                <Grid.Row key={ key } className="act-item">
                    <SectionItem
                        item={ act }
                        onSelectStoryItem={ handleOnSelectStoryItem }
                        selected={ selectedItem.id == act.id }
                        highlighted={ activeSelection }
                    />
                </Grid.Row>
            );
            for (sequenceIndex in act.sequences) {
                key++;
                const sequence = act.sequences[sequenceIndex];
                activeSelection = activeSelection ? activeSelection : selectedItem.id == sequence.id;
                nodes.push(
                    <Grid.Row key={ key } className="sequence-item">
                        <SectionItem
                            item={ sequence }
                            onSelectStoryItem={ handleOnSelectStoryItem }
                            selected={ selectedItem.id == sequence.id }
                            highlighted={ activeSelection }
                        />
                    </Grid.Row>
                );
                for (sceneIndex in sequence.scenes) {
                    key++;
                    const scene = sequence.scenes[sceneIndex];
                    activeSelection = activeSelection ? activeSelection : selectedItem.id == scene.id;
                    nodes.push(
                        <Grid.Row key={ key } className="scene-item">
                            <SectionItem
                                item={ scene }
                                onSelectStoryItem={ handleOnSelectStoryItem }
                                selected={ selectedItem.id == scene.id }
                                highlighted={ activeSelection }
                            />
                        </Grid.Row>
                    );

                    for (panelIndex in scene.panels) {
                        key++;
                        const panel = scene.panels[panelIndex];
                        activeSelection = activeSelection ? activeSelection : selectedItem.id == panel.id;
                        nodes.push(
                            <Grid.Row key={ key } className="panel-item">
                                <SectionItem
                                    item={ panel }
                                    onSelectStoryItem={ handleOnSelectStoryItem }
                                    selected={ selectedItem.id == panel.id }
                                    highlighted={ activeSelection }
                                />
                            </Grid.Row>
                        );
                    }
                }
            }
        }

        return nodes;
    },
    render() {
        const { renderStoryNodes } = this;

        const storyNodes = renderStoryNodes();

        return (
            <Grid verticalAlign="top" className="story-column">
                { storyNodes }
            </Grid>
        )
    }
})

export default StoryColumn;
