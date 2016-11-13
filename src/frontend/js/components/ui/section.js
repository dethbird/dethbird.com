import classNames from 'classnames';
import React from 'react'

import { Count } from "../ui/count"

const Section = React.createClass({


    propTypes: {
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        count: React.PropTypes.number,
        className: React.PropTypes.string
    },

    render: function() {
        const { title, subtitle, count, className, children } = this.props;

        const renderCount = (count) => {
            if (count !== undefined) {
                return (
                    <Count count={ count } />
                )
            }
            return null;
        }

        const subtitleNode = (subtitle) =>  {
            if (!subtitle)
                return null;
            return (
                <div className="section-subtitle">{ subtitle }</div>
            )
        };

        return (
            <div className={ classNames([className, 'section clearfix'])}>
                <div className="pull-left">
                    <span className="section-title">{ renderCount(count) }{ title }</span>
                    { subtitleNode(subtitle) }
                </div>

                <div className="pull-right">{ children }</div>
            </div>
        );
    }
})

module.exports.Section = Section
