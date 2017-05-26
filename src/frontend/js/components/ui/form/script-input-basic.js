import React from 'react';
import * as _ from 'underscore';
import {
    Container,
    Grid,
    Rail,
    Segment,
    TextArea
} from 'semantic-ui-react';
import CodeMirror from 'react-codemirror';
import fountainMode from 'codemirror-mode/fountain/fountain';

const ScriptInputBasic = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        onCursorActivity: React.PropTypes.func
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
    render() {
        const { handleFieldChange } = this;
        const { script, onChange, id, placeholder, onCursorActivity } = this.props;

        return (
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
        )
    }
})

export default ScriptInputBasic;
