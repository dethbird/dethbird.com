import React from 'react';
import * as _ from 'underscore';
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
        onCursorActivity: React.PropTypes.func,
        currentLine: React.PropTypes.number
    },
    handleFieldChange(value, e) {
        const { onChange } = this.props;
        onChange (
            value,
            e.to.line
        );
    },
    componentWillUpdate(nextProps) {
        const { script } = this.props;
        if (this.refs.fountain) {
            if(nextProps.script && !script) {
                this.refs.fountain.getCodeMirror().setValue(nextProps.script);
                this.refs.fountain.getCodeMirror().refresh();
            }
        }
    },
    scrollToToken(token, el) {
        $(this.refs.fountainContainer).scrollTop(el.offsetTop - 50);
    },
    handleClickToken(token) {
        if (this.refs.fountain) {
            this.refs.fountain.getCodeMirror().setCursor({line:token.lines[0].index});
        }
    },
    render() {
        const { handleFieldChange, scrollToToken, handleClickToken } = this;
        const { script, onChange, onCursorActivity, currentLine, onClickToken } = this.props;

        return (
            <Grid>
                <Grid.Column width={ 7 }>
                    <CodeMirror
                        value={ script || '' }
                        onChange={ handleFieldChange }
                        onCursorActivity={ onCursorActivity }
                        options={{
                            lineNumbers: true,
                            lineWrapping: true,
                            autoRefresh: true,
                            mode: 'fountain',
                            theme: 'storystation'
                        }}
                        id={ 'script' }
                        ref="fountain"
                    />
                </Grid.Column>
                <Grid.Column width={ 9 }>
                    <Segment raised={ true } style={ { padding: '0' } }>
                        <div className="fountain-container" ref="fountainContainer" id="fountainContainer">
                            <ScriptPrintPreview
                                script={ script }
                                currentLine={ currentLine }
                                onFindActiveToken={ scrollToToken }
                                onClickToken={ (token)=>{ handleClickToken(token) } }
                            />
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
})

export default ScriptInput;
