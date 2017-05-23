import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'underscore';
import {
    Container,
    Loader
} from 'semantic-ui-react';
import CodeMirror from 'react-codemirror';
import markdownMode from 'codemirror/mode/markdown/markdown';
import fountainMode from 'codemirror-mode/fountain/fountain';

import { UI_STATE } from 'constants/ui-state';
import { charactersGet } from 'actions/character';

import ScriptToken from 'components/ui/script/script-token';
import { tokenizeScript } from 'utility/script-utils';

const ScriptPrintPreview = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired,
        currentLine: React.PropTypes.number
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(charactersGet());
    },
    render() {
        const { script, characters, currentLine } = this.props;

        if (!characters)
            return <Loader active />

        const tokens = tokenizeScript(script);

        const titleNodes = tokens.titleTokens.map(function(token, i){
            return (
                <ScriptToken token={ token } characters={ characters } currentLine={ currentLine } type='title' key={ i }/>
            )
            return null;
        });

        const scriptNodes = tokens.scriptTokens.map(function(token, i){
            return (
                <ScriptToken token={ token } characters={ characters } currentLine={ currentLine } type='script' key={ i }/>
            )
        });

        return (
            <Container className='fountain'>
                { titleNodes }
                { scriptNodes }
            </Container>
        )
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.charactersReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        characters: models
    }
}

export default connect(mapStateToProps)(ScriptPrintPreview);
