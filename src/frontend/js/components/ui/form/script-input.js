import React from 'react';
import * as _ from 'underscore';
import {
    Container,
    Grid,
    Rail,
    Segment,
    TextArea
} from 'semantic-ui-react';

import fountainUtils from 'utility/fountain-utils';

const ScriptInput = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func
    },
    render() {
        const { handleFieldChange } = this;
        const { script, onChange, id, placeholder } = this.props;
        const parsed = fountainUtils.parse(script);

        return (
            <Grid columns={ 2 }>
                <Grid.Column>
                    <TextArea
                        value={ script }
                        onChange={ (e) => { onChange(e, id) } }
                        autoHeight={ true }
                        id={ id }
                        className="script-input"
                        placeholder={ placeholder }
                    />
                </Grid.Column>
                <Grid.Column>
                    <Segment raised={ true } className="fountain-container">
                        <div
                            className="fountain"
                            dangerouslySetInnerHTML={ {
                                __html: parsed.html.title_page + parsed.html.script
                            } }
                        />
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
})

export default ScriptInput;
