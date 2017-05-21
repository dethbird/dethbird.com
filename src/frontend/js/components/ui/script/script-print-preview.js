import React from 'react';
import * as _ from 'underscore';
import {
    Container
} from 'semantic-ui-react';
import CodeMirror from 'react-codemirror';
import markdownMode from 'codemirror/mode/markdown/markdown';
import fountainMode from 'codemirror-mode/fountain/fountain';

import ScriptToken from 'components/ui/script/script-token';

import { tokenizeScript } from 'utility/script-utils';

const ScriptPrintPreview = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired
    },
    render() {
        const { script } = this.props;

        const tokens = tokenizeScript(script);

        const titleNodes = tokens.titleTokens.map(function(token, i){
            return (
                <ScriptToken token={ token } type='title' key={ i }/>
            )
            return null;
        });

        const scriptNodes = tokens.scriptTokens.map(function(token, i){
            return (
                <ScriptToken token={ token } type='script' key={ i }/>
            )
        });

        return (
            <Container className='fountain'>
                { titleNodes }
                { scriptNodes }
            </Container>
        )
    }
})

export default ScriptPrintPreview;
