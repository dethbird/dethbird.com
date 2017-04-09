import React from 'react';
import * as _ from 'underscore';
import {
    Container,
    Grid
} from 'semantic-ui-react';

import { milisecondsToDuration } from 'utility/fountain-parser';

import SectionItem from 'components/ui/story-player/story-column/section-item';

const StoryColumn = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired,
        selectedItem: React.PropTypes.object.isRequired,
        onSelectStoryItem: React.PropTypes.func,
        playingPanel: React.PropTypes.object
    },
    handleOnSelectStoryItem(e, payload) {
        const { onSelectStoryItem } = this.props;
        if (onSelectStoryItem) {
            onSelectStoryItem(e, payload);
        }
    },
    renderStoryNodes() {
        const { handleOnSelectStoryItem } = this;
        const { story, selectedItem, playingPanel } = this.props;

        if (!story.acts) {
            return null;
        }
        let nodes = [];
        let actIndex, sequenceIndex, sceneIndex, panelIndex, key = 0;
        let activeSelection = false;
        story.duration_in_miliseconds = 0;

        let actNodes = [];
        for (actIndex in story.acts) {
            const act = story.acts[actIndex];
            act.duration_in_miliseconds = 0;
            let sequenceNodes = [];
            for (sequenceIndex in act.sequences) {
                const sequence = act.sequences[sequenceIndex];
                sequence.duration_in_miliseconds = 0;
                let sceneNodes = [];
                for (sceneIndex in sequence.scenes) {
                    const scene = sequence.scenes[sceneIndex];
                    scene.duration_in_miliseconds = 0;
                    let panelNodes = [];
                    for (panelIndex in scene.panels) {
                        key++;
                        const panel = scene.panels[panelIndex];
                        scene.duration_in_miliseconds = scene.duration_in_miliseconds + panel.duration_in_miliseconds;
                        sequence.duration_in_miliseconds = sequence.duration_in_miliseconds + panel.duration_in_miliseconds;
                        act.duration_in_miliseconds = act.duration_in_miliseconds + panel.duration_in_miliseconds;
                        story.duration_in_miliseconds = story.duration_in_miliseconds + panel.duration_in_miliseconds;

                        console.log(
                             _.findWhere([story,act,sequence,scene].concat(scene.panels.slice(panelIndex, scene.panels.length)), {id: selectedItem.id})
                        );
                        panel.duration = milisecondsToDuration(panel.duration_in_miliseconds);
                        panelNodes.push(
                            <Grid.Row key={ key } className="panel-item">
                                <SectionItem
                                    item={ panel }
                                    onSelectStoryItem={ handleOnSelectStoryItem }
                                    selected={ selectedItem.id == panel.id }
                                    highlighted={ _.findWhere([story,act,sequence,scene].concat(scene.panels.slice(0, panelIndex)), {id: selectedItem.id}) !== undefined }
                                    playing={ panel.id == playingPanel.id }
                                />
                            </Grid.Row>
                        );
                    }
                    key++;
                    scene.duration = milisecondsToDuration(scene.duration_in_miliseconds);
                    sceneNodes.push(
                        <Grid.Row key={ key } className="scene-item">
                            <SectionItem
                                item={ scene }
                                onSelectStoryItem={ handleOnSelectStoryItem }
                                selected={ selectedItem.id == scene.id }
                                highlighted={ _.findWhere([story,act,sequence,scene], {id: selectedItem.id}) !== undefined }
                            />
                        </Grid.Row>
                    );
                    sceneNodes.push(panelNodes);
                }
                key++;
                sequence.duration = milisecondsToDuration(sequence.duration_in_miliseconds);
                sequenceNodes.push(
                    <Grid.Row key={ key } className="sequence-item">
                        <SectionItem
                            item={ sequence }
                            onSelectStoryItem={ handleOnSelectStoryItem }
                            selected={ selectedItem.id == sequence.id }
                            highlighted={ _.findWhere([story,act,sequence], {id: selectedItem.id}) !== undefined }
                        />
                    </Grid.Row>
                );
                sequenceNodes.push(sceneNodes);
            }
            key ++;
            act.duration = milisecondsToDuration(act.duration_in_miliseconds);
            actNodes.push(
                <Grid.Row key={ key } className="act-item">
                    <SectionItem
                        item={ act }
                        onSelectStoryItem={ handleOnSelectStoryItem }
                        selected={ selectedItem.id == act.id }
                        highlighted={ _.findWhere([story,act], {id: selectedItem.id}) !== undefined }
                    />
                </Grid.Row>
            );
            actNodes.push(sequenceNodes);

        }
        key++;
        story.duration = milisecondsToDuration(story.duration_in_miliseconds);
        nodes.push(
            <Grid.Row key={ key } className="story-item">
                <SectionItem
                    item={ story }
                    onSelectStoryItem={ handleOnSelectStoryItem }
                    selected={ selectedItem.id == story.id }
                    highlighted={ _.findWhere([story], {id: selectedItem.id}) !== undefined }
                />
            </Grid.Row>
        );
        nodes.push(actNodes);
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
