import classNames from 'classnames';
import React from 'react'

import { Card as MaterialCard } from 'material-ui/Card';

const Card = React.createClass({

    propTypes: {
        className: React.PropTypes.string
    },

    render: function() {
        const { className, children } = this.props;

        return (
            <MaterialCard className={ classNames([className, 'card']) }>
                { children }
            </MaterialCard>
        );
    }
})

module.exports.Card = Card
