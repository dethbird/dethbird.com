import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Grid,
    Segment
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import StoryColumn from 'components/ui/column/story-column';
import { UI_STATE } from 'constants/ui-state';
import { storyGet } from 'actions/story';
import * as jsonSchema from 'utility/json-schema';
import {
    convertTokensToStory,
    lexizeScript,
    tokenizeLines
} from 'utility/fountain-parser';


const StoryPlayer = React.createClass({
    propTypes: {
        id: React.PropTypes.string
    },
    getInitialState() {
        return {
            model: {
                script: ''
            }
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
                 model: nextProps.model
            });
        }
    },
    render() {
        const { id, ui_state, errors } = this.props;
        const { model } = this.state;
        const story = model.script ? convertTokensToStory(tokenizeLines(lexizeScript(model.script))) : {};

        return (
            <Container>
                <Grid>
                    <Grid.Column width={ 6 }>
                        <StoryColumn story={ story } />
                    </Grid.Column>
                    <Grid.Column width={ 10 }>
                        <Segment inverted>Player</Segment>
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
