import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Container
} from 'semantic-ui-react';

import StoryCard from 'components/ui/card/story-card';
import { UI_STATE } from 'constants/ui-state';
import { storiesGet } from 'actions/story';

const StoriesList = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(storiesGet());
    },
    render() {
        const { models } = this.props;

        const storyNodes = models ? models.map(function(story, i){
            return (
                <StoryCard story={ story } key={ i } />
            );
        }) : [];

        return (
            <Container>
                <Card.Group itemsPerRow={ 4 } >
                    { storyNodes }
                </Card.Group>
            </Container>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.storiesReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(StoriesList);
