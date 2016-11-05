import React from 'react'

import { Count } from "../ui/count"

const Section = React.createClass({


    propTypes: {
        title: React.PropTypes.string,
        count: React.PropTypes.number
    },

    render: function() {
        const { title, count, children } = this.props;

        const renderCount = (count) => {
            if (count !== undefined) {
                return (
                    <Count count={ count } />
                )
            }
            return null;
        }

        return (
            <div className="section clearfix">
                <span className="section-title pull-left">{ renderCount(count) }{ title }</span>
                <div className="pull-right">{ children }</div>
            </div>
        );
    }
})

module.exports.Section = Section
