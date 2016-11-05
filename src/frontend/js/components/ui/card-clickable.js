import React from 'react'

import classNames from 'classnames';

import { Card } from "../ui/card"

const CardClickable = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.array
        ]).isRequired,
        onClick: React.PropTypes.func.isRequired,
        className: React.PropTypes.string
    },

    render: function() {

        const { children, onClick, className } = this.props;

        return (
            <Card className={ className }>
                <div
                    className="clickable"
                    onClick={ onClick }
                >
                    { children }
                </div>
            </Card>
        );
    }
})

module.exports.CardClickable = CardClickable
