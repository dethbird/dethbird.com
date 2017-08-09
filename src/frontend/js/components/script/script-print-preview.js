import React, { Component } from 'react';

import ScriptToken from 'components/script/script-token';
import { tokenizeScript } from 'utility/script-utils';

    class ScriptPrintPreview extends Component {
    render() {
        const { script } = this.props;
        const tokens = tokenizeScript(script);

        const titleNodes = tokens.titleTokens.map(function(token, i){
            return (
                <ScriptToken
                    token={ token }
                    type='title'
                    key={ i }
                />
            );
        });

        const scriptNodes = tokens.scriptTokens.map(function(token, i){
            return (
                <ScriptToken
                    token={ token }
                    type='script'
                    key={ i }
                />
            );
        });

        return (
            <div className='fountain'>
                { titleNodes }
                { scriptNodes }
            </div>
        )
    }
};

export default ScriptPrintPreview;
