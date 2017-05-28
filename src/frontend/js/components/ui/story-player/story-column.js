import React from 'react';
import * as _ from 'underscore';
import {
    Container,
    Grid
} from 'semantic-ui-react';

import { millisecondsToDuration } from 'utility/fountain-parser';

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

        let actNodes = [];
        for (actIndex in story.acts) {
            const act = story.acts[actIndex];
            let sequenceNodes = [];
            for (sequenceIndex in act.sequences) {
                const sequence = act.sequences[sequenceIndex];
                let sceneNodes = [];
                for (sceneIndex in sequence.scenes) {
                    const scene = sequence.scenes[sceneIndex];
                    let panelNodes = [];
                    for (panelIndex in scene.panels) {
                        key++;
                        const panel = scene.panels[panelIndex];

                        panelNodes.push(
                            <Grid.Row key={ key } className="panel-item">
                                <SectionItem
                                    item={ panel }
                                    onSelectStoryItem={ handleOnSelectStoryItem }
                                    selected={ selectedItem.id == panel.id }
                                    highlighted={ (_.findWhere([story,act,sequence,scene].concat(scene.panels.slice(0, panelIndex)), {id: selectedItem.id}) !== undefined) || selectedItem.id == panel.id }
                                    playing={ panel.id == playingPanel.id }
                                />
                            </Grid.Row>
                        );
                    }
                    key++;
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
