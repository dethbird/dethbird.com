import classNames from 'classnames';
import React from 'react';
import { browserHistory } from 'react-router';

import SecurityContext from '../ui/security-context';

const AppHeader = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        securityContext: React.PropTypes.object.isRequired
    },

    render: function() {
        const { className, securityContext } = this.props;

        if (securityContext.application_user == 1)
            return null;

        return (
            <div className="columns">
                <div className="column is-10">
                    <nav className="level">
                        <div className="level-left">
                            <a className="level-item" title="Home" onClick={ () => browserHistory.push(`/`)}>
                                <span className="icon">
                                    <i className="fa fa-home"></i>
                                </span>
                            </a>
                            <a className="level-item" title="Submit" onClick={ () => browserHistory.push(`/content/article/add`)}>
                                <span className="icon">
                                    <i className="fa fa-plus"></i>
                                </span>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="column is-2 clearfix">
                    <SecurityContext securityContext={ securityContext } className="has-text-right"/>
                </div>
            </div>
        );
    }
})

export default AppHeader;
