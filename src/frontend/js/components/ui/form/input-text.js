import classNames from 'classnames';
import React from 'react'

const InputText = React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errorText: React.PropTypes.string,
        password: React.PropTypes.bool

    },

    render: function() {
        const { label, id, value, onChange, errorText, password } = this.props;

        return (
            <input
                hintText={ label }
                floatingLabelText={ label }
                id={ id }
                value={ value || '' }
                onChange= { onChange }
                className='input-text'
                errorText={ errorText }
                type={ password===true ? "password" : "text" }
            />
        );
    }
})

export default InputText
