import React from 'react';
import { connect } from 'react-redux';
import {
    Container
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { charactersGet } from 'actions/character';

import { collateScriptCharactersWithCharacters } from 'utility/fountain-parser';

const ScriptCastList = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            models: []
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(charactersGet());
    },
    render() {
        const { models, ui_state, errors, script } = this.props;
        // cross check script characters with saved characters
        const collated = collateScriptCharactersWithCharacters(script, models);
        console.log(collated)
        return (
            <Container text={ true }>
                cast of chars
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.charactersReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(ScriptCastList);
