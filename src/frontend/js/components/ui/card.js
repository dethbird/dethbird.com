import classNames from 'classnames';
import React from 'react'

import { Card as MaterialCard } from 'material-ui/Card';

const Card = React.createClass({

    propTypes: {
        className: React.PropTypes.string
    },

    render: function() {
        const { children } = this.props;

        return (
            <MaterialCard className={ classNames([this.props.className, 'card']) }>
                { this.props.children }
            </MaterialCard>
        );
    }
})

module.exports.Card = Card
