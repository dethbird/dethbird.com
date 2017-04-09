import React from 'react';
import {
    Button,
    Container,
    Grid,
    Segment
} from 'semantic-ui-react';

import Player from 'components/ui/story-player/story-section-player/player';
import SelectedItem from 'components/ui/story-player/story-section-player/selected-item';


const StorySectionPlayer = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired,
        selectedItem: React.PropTypes.object.isRequired,
        onClickPlay: React.PropTypes.func.isRequired,
        onClickPause: React.PropTypes.func.isRequired
    },
    extractPanelsToPlay(story, selectedItem){
        let nodes = [];
        let actIndex, sequenceIndex, sceneIndex, panelIndex;
        let activeSelection = false;

        activeSelection = selectedItem.id == story.id;
        for (actIndex in story.acts) {
            const act = story.acts[actIndex];
            activeSelection = selectedItem.id == story.id;
            activeSelection = activeSelection ? activeSelection : selectedItem.id == act.id;
            for (sequenceIndex in act.sequences) {
                const sequence = act.sequences[sequenceIndex];
                activeSelection = activeSelection ? activeSelection : selectedItem.id == sequence.id;
                for (sceneIndex in sequence.scenes) {
                    const scene = sequence.scenes[sceneIndex];
                    activeSelection = activeSelection ? activeSelection : selectedItem.id == scene.id;
                    for (panelIndex in scene.panels) {
                        const panel = scene.panels[panelIndex];
                        activeSelection = activeSelection ? activeSelection : selectedItem.id == panel.id;
                        if (activeSelection) {
                            nodes.push(panel);
                        }
                    }
                }
            }
        }
        return nodes;
    },
    render() {
        const { extractPanelsToPlay } = this;
        const { story, selectedItem, onClickPlay, onClickPause } = this.props;
        if (!selectedItem.id) {
            return (
                <Container>No item selected</Container>
            );
        }
        // extract panels to play
        const panels = extractPanelsToPlay(story, selectedItem);

        return (
            <Grid className="story-section-player" as={ Container } >
                <Grid.Row>
                    <Player panels={ panels } onClickPlay={ onClickPlay } onClickPause={ onClickPause }/>
                </Grid.Row>
                <Grid.Row>
                    <SelectedItem selectedItem={ selectedItem } />
                </Grid.Row>
            </Grid>
        );
    }
})

export default StorySectionPlayer;
