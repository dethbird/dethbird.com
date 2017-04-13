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


import { parseFountainScript } from 'utility/fountain-parser';

const ScriptInput = React.createClass({
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
        const parsed = parseFountainScript(script);

        return (
            <Grid>
                <Grid.Column width={ 7 }>
                    <CodeMirror
                        value={ script || '' }
                        onChange={ (e) => { handleFieldChange(e, id) } }
                        options={{
                            lineNumbers: true,
                            lineWrapping: true,
                            mode: 'fountain',
                            theme: 'base16-light'
                        }}
                        id={ id }
                    />
                </Grid.Column>
                <Grid.Column width={ 9 }>
                    <Segment raised={ true } className="fountain-container">
                        <div
                            className="fountain"
                            dangerouslySetInnerHTML={ {
                                __html: parsed.markup
                            } }
                        />
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
})

export default ScriptInput;
