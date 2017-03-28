import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Container
} from 'semantic-ui-react';

import ScriptCard from 'components/ui/card/script-card';
import { UI_STATE } from 'constants/ui-state';
import { scriptsGet } from 'actions/script';

const ScriptsList = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(scriptsGet());
    },
    render() {
        const { models } = this.props;

        const scriptNodes = models ? models.map(function(script, i){
            return (
                <ScriptCard script={ script } key={ i } />
            );
        }) : [];

        return (
            <Container>
                <Card.Group itemsPerRow={ 4 } >
                    { scriptNodes }
                </Card.Group>
            </Container>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.scriptsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(ScriptsList);
