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
            <div className="columns is-mobile">
                <div className="column is-6">
                    <div className="control is-grouped-left">
                        <p className="control">
                            <a title="Home" onClick={ () => browserHistory.push(`/`)}>
                                <span className="icon">
                                    <i className="fa fa-home"></i>
                                </span>
                            </a>
                        </p>
                        <p className="control">
                            <a title="Submit" onClick={ () => browserHistory.push(`/content/article/add`)}>
                                <span className="icon">
                                    <i className="fa fa-plus"></i>
                                </span>
                            </a>
                        </p>
                    </div>
                </div>
                <div className="column is-6 clearfix">
                    <SecurityContext securityContext={ securityContext } className="has-text-right"/>
                </div>
            </div>
        );
    }
})

export default AppHeader;
