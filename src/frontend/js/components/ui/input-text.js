import classNames from 'classnames';
import React from 'react'

import TextField from 'material-ui/TextField';

const InputText = React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errorText: React.PropTypes.string

    },

    render: function() {

        const { label, id, value, onChange, errorText } = this.props;

        return (

            <TextField
                hintText={ label }
                floatingLabelText={ label }
                id={ id }
                value={ value || '' }
                onChange= { onChange }
                className='input-text'
                errorText={ errorText }
            />
        );
    }
})

export default InputText
