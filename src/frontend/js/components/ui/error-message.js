import React from 'react';
import {
    Message
} from 'semantic-ui-react';

const ErrorMessage = React.createClass({
    propTypes: {
        message: React.PropTypes.string
    },
    render() {
        const { message } = this.props;
        if(message)
            return (
                <Message
                    error
                    content={ message }
                />
            );
        return null;
    }
})

export default ErrorMessage;
