import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Container,
    Loader
} from 'semantic-ui-react';

import StoryCard from 'components/ui/card/story-card';
import StoriesFilter from 'components/ui/list/filter/stories-filter';
import { UI_STATE } from 'constants/ui-state';
import { storiesGet } from 'actions/story';

const StoriesList = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(storiesGet());
    },
    handleFilter(e, payload) {
        const { dispatch } = this.props;
        dispatch(storiesGet(payload));
    },
    render() {
        const { handleFilter } = this;
        const { models } = this.props;

        const storyNodes = models ? models.map(function(story, i){
            return (
                <StoryCard story={ story } key={ i } />
            );
        }) : <Loader active />;

        return (
            <Container>
                <StoriesFilter onFilter={ handleFilter } />
                <Card.Group itemsPerRow={ 3 } >
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
