import classNames from 'classnames';
import React from 'react'


const SecurityContext = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        securityContext: React.PropTypes.object
    },

    render: function() {
        const { className, securityContext } = this.props;
        console.log(securityContext);
        return (
            <div className={ classNames([className, 'securty-context']) }>
                <a className="button is-light">Login</a>
            </div>
        );
    }
})

export default SecurityContext;
