import React from 'react';
import * as _ from 'underscore';
import {
    Container,
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
        const { script, onChange } = this.props;
        const parsed = fountainUtils.parse(script);

        return (
            <Container>
                <TextArea
                    value={ script }
                    onChange={ (e) => { onChange(e, 'script') } }
                    autoHeight={ true }
                />
            <Segment raised={ true }>
                    <div
                        className="fountain"
                        dangerouslySetInnerHTML={ {
                            __html: parsed.html.title_page + parsed.html.script
                        } }
                    />
                </Segment>
            </Container>
        )
    }
})

export default ScriptInput;
