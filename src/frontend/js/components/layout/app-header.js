import classNames from 'classnames';
import React from 'react';


const AppHeader = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        title: React.PropTypes.string.isRequired
    },

    render: function() {
        const { className, title } = this.props;

        return (
            <svg xmlns="http://www.w3.org/2000/svg"  width="500" height="40" viewBox="0 0 500 40">
                <text x="0" y="35" fontFamily="IM Fell English" fontSize="35">
                    { title }
                </text>
            </svg>
        );
    }
})

export default AppHeader;
