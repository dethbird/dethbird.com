import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Grid,
    Segment
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import { UI_STATE } from 'constants/ui-state';
import { storyGet } from 'actions/story';
import * as jsonSchema from 'utility/json-schema';
import {
    convertTokensToStory,
    lexizeScript,
    tokenizeLines
} from 'utility/fountain-parser';


import StoryColumn from 'components/ui/story-player/story-column';
import StorySectionPlayer from 'components/ui/story-player/story-section-player';


const StoryPlayer = React.createClass({
    propTypes: {
        id: React.PropTypes.string
    },
    getInitialState() {
        return {
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
    render() {
        const { handleOnSelectStoryItem, handleClickPlay, handleClickPause } = this;
        const { id, ui_state, errors, onCliCkPause } = this.props;
        const { model, selectedItem, story, playingPanel } = this.state;

        return (
            <Container className="story-player">
                <Grid>
                    <Grid.Column width={ 6 }>
                        <StoryColumn story={ story } onSelectStoryItem={ handleOnSelectStoryItem } selectedItem={ selectedItem } playingPanel={ playingPanel } />
                    </Grid.Column>
                    <Grid.Column width={ 10 }>
                        <StorySectionPlayer story={ story } selectedItem={ selectedItem } onClickPlay={ handleClickPlay }  onClickPause={ handleClickPause } />
                    </Grid.Column>
                </Grid>
            </Container>
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
