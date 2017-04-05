import React from 'react';
import * as _ from 'underscore';
import {
    Container,
    Grid,
    Rail,
    Segment,
    TextArea
} from 'semantic-ui-react';

import { parseFountainScript } from 'utility/fountain-parser';

const ScriptInput = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func
    },
    render() {
        const { handleFieldChange } = this;
        const { script, onChange, id, placeholder } = this.props;
        const parsed = parseFountainScript(script);

        return (
            <Grid>
                <Grid.Column width={ 7 }>
                    <TextArea
                        value={ script }
                        onChange={ (e) => { onChange(e, id) } }
                        autoHeight={ true }
                        id={ id }
                        className="script-input"
                        placeholder={ placeholder }
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
