import React from 'react'
import ReactMarkdown from 'react-markdown'

import classNames from 'classnames';

const Description = React.createClass({

    propTypes: {
        source: React.PropTypes.string,
        className: React.PropTypes.string
    },

    render: function() {
        const { source } = this.props;
        const className = classNames([this.props.className, 'description'])

        if (source)
            return (
                <ReactMarkdown
                    className={ className }
                    source={ this.props.source || '' }
                >
                </ReactMarkdown>
            );
        return null;
    }
})

module.exports.Description = Description
