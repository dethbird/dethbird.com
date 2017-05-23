import React from 'react';
import * as _ from 'underscore';
import { animateScroll } from 'react-scroll';
import {
    Container,
    Grid,
    Segment
} from 'semantic-ui-react';
import CodeMirror from 'react-codemirror';
import markdownMode from 'codemirror/mode/markdown/markdown';
import fountainMode from 'codemirror-mode/fountain/fountain';

import ScriptPrintPreview from 'components/ui/script/script-print-preview';


const ScriptInput = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        currentLine: React.PropTypes.number
    },
    handleFieldChange(value, e) {
        const { onChange } = this.props;
        onChange (
            value,
            e.to.line
        );
    },
    scrollToToken(token, el) {
        console.log(el);
        console.log(this.refs);
        animateScroll.scrollTo(`token-${token.id}`, { containerId: 'fountainContainer'} );
    },
    render() {
        const { handleFieldChange, scrollToToken } = this;
        const { script, onChange, currentLine } = this.props;

        return (
            <Grid>
                <Grid.Column width={ 7 }>
                    <CodeMirror
                        value={ script || '' }
                        onChange={ handleFieldChange }
                        options={{
                            lineNumbers: true,
                            lineWrapping: true,
                            mode: 'fountain',
                            theme: 'storystation'
                        }}
                        id={ 'script' }
                    />
                </Grid.Column>
                <Grid.Column width={ 9 }>
                    <Segment raised={ true } style={ { padding: '0' } }>
                        <div className="fountain-container" ref="fountainContainer" id="fountainContainer">
                            <ScriptPrintPreview script={ script } currentLine={ currentLine } onFindActiveToken={ scrollToToken }/>
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
})

export default ScriptInput;
