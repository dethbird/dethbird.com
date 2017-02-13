import classNames from 'classnames';
import React from 'react'

import Checkbox from 'material-ui/Checkbox';

const InputCheckbox = React.createClass({

    propTypes: {
        value: React.PropTypes.string.isRequired,
        onCheck: React.PropTypes.func.isRequired

    },

    render: function() {
        const { label, id, value, onCheck } = this.props;

        return (
            <Checkbox
                value={ value || '' }
                onCheck= { onCheck }
                className='input-checkbox'
                labelStyle = {{
                    width: 0
                }}
            />
        );
    }
})

export default InputCheckbox
