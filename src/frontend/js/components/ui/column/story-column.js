import React from 'react';
import {
    Container,
    Grid
} from 'semantic-ui-react';

import StoryItem from 'components/ui/column/story-column/story-item';
import ActItem from 'components/ui/column/story-column/act-item';
import SequenceItem from 'components/ui/column/story-column/sequence-item';
import SceneItem from 'components/ui/column/story-column/scene-item';
import PanelItem from 'components/ui/column/story-column/panel-item';

const StoryColumn = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired
    },
    renderStoryNodes() {
        const { story } = this.props;

        if (!story.acts) {
            return null;
        }

        let nodes = [];
        let actIndex, sequenceIndex, sceneIndex, panelIndex, key = 0;
        console.log(story);
        nodes.push(<Grid.Row key={ key }><StoryItem story={ story } /></Grid.Row>);
        for (actIndex in story.acts) {
            key ++;
            const act = story.acts[actIndex];
            nodes.push(
                <Grid.Row key={ key }><ActItem act={ act } /></Grid.Row>
            );
            for (sequenceIndex in act.sequences) {
                key++;
                const sequence = act.sequences[sequenceIndex];
                nodes.push(
                    <Grid.Row key={ key }><SequenceItem sequence={ sequence } /></Grid.Row>
                );
                for (sceneIndex in sequence.scenes) {
                    key++;
                    const scene = sequence.scenes[sceneIndex];
                    nodes.push(
                        <Grid.Row key={ key }><SceneItem scene={ scene } /></Grid.Row>
                    );

                    for (panelIndex in scene.panels) {
                        key++;
                        const panel = scene.panels[panelIndex];
                        nodes.push(
                            <Grid.Row key={ key }><PanelItem panel={ panel } /></Grid.Row>
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
            <Grid verticalAlign="top">
                { storyNodes }
            </Grid>
        )
    }
})

export default StoryColumn;
