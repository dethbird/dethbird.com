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
import markdownMode from 'codemirror/mode/markdown/markdown';
import fountainMode from 'codemirror-mode/fountain/fountain';

const ScriptInputBasic = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func
    },
    handleFieldChange(value, id) {
        const { onChange } = this.props;
        onChange (
            { currentTarget: { value }},
            id
        );
    },
    render() {
        const { handleFieldChange } = this;
        const { script, onChange, id, placeholder } = this.props;

        return (
            <CodeMirror
                value={ script || '' }
                onChange={ (e) => { handleFieldChange(e, id) } }
                options={{
                    lineNumbers: true,
                    lineWrapping: true,
                    mode: 'fountain',
                    theme: 'storystation'
                }}
                id={ id }
            />
        )
    }
})

export default ScriptInputBasic;
