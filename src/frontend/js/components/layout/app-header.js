import classNames from 'classnames';
import React from 'react';
import { browserHistory } from 'react-router';


const AppHeader = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        securityContext: React.PropTypes.object
    },

    render: function() {
        const { className, securityContext } = this.props;

        return (
            <div className="columns is-mobile app-header">
                farts
            </div>
        );
    }
})

export default AppHeader;
