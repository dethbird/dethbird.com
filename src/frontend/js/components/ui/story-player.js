import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Form,
    Grid,
    Icon,
    Segment
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import { UI_STATE } from 'constants/ui-state';
import { storyGet, storyPut, storyPost } from 'actions/story';
import * as jsonSchema from 'utility/json-schema';
import {
    convertTokensToStory,
    lexizeScript,
    tokenizeLines
} from 'utility/fountain-parser';


import StoryColumn from 'components/ui/story-player/story-column';
import StorySectionPlayer from 'components/ui/story-player/story-section-player';
import storyPostSchema from 'validation_schema/story-post.json';
import ScriptInputBasic from 'components/ui/form/script-input-basic';


const StoryPlayer = React.createClass({
    propTypes: {
        id: React.PropTypes.string
    },
    getInitialState() {
        return {
            changedFields: {},
            model: {
                script: ''
            },
            selectedItem: {
                id: null
            },
            playingPanel: {
                id: null
            },
            story: {}
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { id } = this.props;
        if (id) {
            dispatch(storyGet(id));
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.model!==undefined) {
            this.setState({
                 ... this.state,
                 model: nextProps.model,
                 story: convertTokensToStory(tokenizeLines(lexizeScript(nextProps.model.script)))
            });
        }
    },
    handleOnSelectStoryItem(e, payload) {
        this.setState({
            ... this.state,
            selectedItem: payload
        });
    },
    handleClickPlay(e, payload) {
        this.setState({
            ... this.state,
            playingPanel: payload
        });
    },
    handleClickPause() {
        this.setState({
            ... this.state,
            playingPanel: {
                id: null
            }
        });
    },
    handleFieldChange(e, elementId) {
        const { changedFields, story } = this.state;
        changedFields[elementId] = e.currentTarget.value;
        const newStory = elementId == 'script'
             ? convertTokensToStory(tokenizeLines(lexizeScript(e.currentTarget.value)))
             : story;

        this.setState({
            ... this.state,
            changedFields,
            story: newStory
        });
    },
    onClickSubmit() {
        const { id, dispatch } = this.props;
        const { changedFields } = this.state;
        if (id) {
            dispatch(storyPut(id, changedFields));
        } else {
            dispatch(storyPost(changedFields));
        }
    },
    render() {
        const { handleFieldChange, handleOnSelectStoryItem, handleClickPlay, handleClickPause } = this;
        const { id, ui_state, errors, onCliCkPause } = this.props;
        const { model, selectedItem, story, playingPanel, changedFields } = this.state;

        const inputFields = jsonSchema.buildInputFields(model, changedFields, storyPostSchema);

        return (
            <Form
                size="large"
                loading={ ui_state == UI_STATE.REQUESTING }
                error={ ui_state == UI_STATE.ERROR }
                success={ ui_state == UI_STATE.SUCCESS }
            >
                <Container className="story-player" fluid>
                    <Grid>
                        <Grid.Column width={ 4 }>
                            <Segment basic>

                                <Button as="a" onClick={()=>{browserHistory.push(`/story/${id}/edit`)}} attached="left">
                                    <Icon name="edit" /> Editor
                                </Button>
                                <Button attached='right' disabled>
                                    <Icon name="play" /> Player
                                </Button>

                                <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 } ><Icon name="save" /> { id ? "Save" : "Create" }</Button>
                            </Segment>
                            <ScriptInputBasic script={ inputFields.script || '' } onChange={ handleFieldChange } id='script'/>
                        </Grid.Column>
                        <Grid.Column width={ 4 }>
                            <StoryColumn story={ story } onSelectStoryItem={ handleOnSelectStoryItem } selectedItem={ selectedItem } playingPanel={ playingPanel } />
                        </Grid.Column>
                        <Grid.Column width={ 8 }>
                            <StorySectionPlayer
                                story={ story }
                                selectedItem={ selectedItem }
                                onClickPlay={ handleClickPlay }
                                onClickPause={ handleClickPause }
                                playingPanel={ playingPanel }
                            />
                        </Grid.Column>
                    </Grid>
                </Container>
            </Form>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.storyReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(StoryPlayer);
