import React, { Component } from 'react';
import PropTypes from 'prop-types'

class FormWrapper extends Component {
    render() {
        const { onSubmit } = this.props;
        return (
            <form onSubmit={ onSubmit } >
                { this.props.children }
            </form>
        );
    }
};

FormWrapper.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default FormWrapper;
