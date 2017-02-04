import React from 'react';

import SecurityContext from '../ui/security-context';

const Login = React.createClass({

    render() {
        return (
            <div className="box container">
                <SecurityContext securityContext={ securityContext } />
            </div>
        );
    }
})


export default Login;
