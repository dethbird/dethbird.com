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
    handleOnSelectStoryItem(e, payload) {
        console.log(payload);
    },
    renderStoryNodes() {
        const { handleOnSelectStoryItem } = this;
        const { story } = this.props;

        if (!story.acts) {
            return null;
        }

        let nodes = [];
        let actIndex, sequenceIndex, sceneIndex, panelIndex, key = 0;

        nodes.push(<Grid.Row key={ key } className="story-item"><StoryItem story={ story } onSelectStoryItem={ handleOnSelectStoryItem }/></Grid.Row>);
        for (actIndex in story.acts) {
            key ++;
            const act = story.acts[actIndex];
            nodes.push(
                <Grid.Row key={ key } className="act-item"><ActItem act={ act } /></Grid.Row>
            );
            for (sequenceIndex in act.sequences) {
                key++;
                const sequence = act.sequences[sequenceIndex];
                nodes.push(
                    <Grid.Row key={ key } className="sequence-item"><SequenceItem sequence={ sequence } /></Grid.Row>
                );
                for (sceneIndex in sequence.scenes) {
                    key++;
                    const scene = sequence.scenes[sceneIndex];
                    nodes.push(
                        <Grid.Row key={ key } className="scene-item"><SceneItem scene={ scene } /></Grid.Row>
                    );

                    for (panelIndex in scene.panels) {
                        key++;
                        const panel = scene.panels[panelIndex];
                        nodes.push(
                            <Grid.Row key={ key } className="panel-item"><PanelItem panel={ panel } /></Grid.Row>
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
