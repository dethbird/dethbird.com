import classNames from 'classnames';
import React from 'react';

import SecurityContext from '../ui/security-context';

const AppHeader = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        title: React.PropTypes.string.isRequired
    },

    render: function() {
        const { className, title } = this.props;

        return (
            <div className="columns">
                <div className="column is-10">
                    <svg xmlns="http://www.w3.org/2000/svg"  width="500" height="50" viewBox="0 0 500 50">
                        <text x="0" y="35" fontFamily="IM Fell English" fontSize="35">
                            { title }
                        </text>
                    </svg>
                </div>
                <div className="column is-2 clearfix">
                    <SecurityContext securityContext={ securityContext } className="has-text-right"/>
                </div>
            </div>
        );
    }
})

export default AppHeader;
