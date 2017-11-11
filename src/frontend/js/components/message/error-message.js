import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Message
} from 'semantic-ui-react';

class ErrorMessage extends Component {
    render() {
        const { message } = this.props;
        if (message)
            return (
                <Message
                    error
                    content={message}
                />
            );
        return null;
    }
};

ErrorMessage.propTypes = {
    message: PropTypes.string
};

export default ErrorMessage;