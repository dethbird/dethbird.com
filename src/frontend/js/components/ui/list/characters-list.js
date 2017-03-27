import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Container
} from 'semantic-ui-react';

import CharacterCard from 'components/ui/card/character-card';
import { UI_STATE } from 'constants/ui-state';
import { charactersGet } from 'actions/character';

const CharactersList = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(charactersGet());
    },
    render() {
        const { models } = this.props;

        const characterNodes = models ? models.map(function(character, i){
            return (
                <CharacterCard character={ character } key={ i } />
            );
        }) : [];

        return (
            <Container>
                <Card.Group itemsPerRow={ 4 } >
                    { characterNodes }
                </Card.Group>
            </Container>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.charactersReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(CharactersList);
