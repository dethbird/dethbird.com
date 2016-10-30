import classNames from 'classnames';
import React from 'react'

const Count = React.createClass({

    propTypes: {
        count: React.PropTypes.number.isRequired,
        className: React.PropTypes.string
    },

    render: function() {

        let tagClass = 'tag-default'
        if (this.props.count > 0) {
            tagClass = 'tag-info'
        }

        let className = classNames([this.props.className, 'tag', tagClass])
        return (
            <span className={ className }>
                { this.props.count }
            </span>
        );
    }
})

module.exports.Count = Count
