import classNames from 'classnames';
import React from 'react'

const Count = React.createClass({

    propTypes: {
        count: React.PropTypes.number.isRequired,
        className: React.PropTypes.string,
        secondary: React.PropTypes.string
    },

    render: function() {

        const { count, className, secondary } = this.props;

        let tagClass = 'tag-default'
        if (count > 0) {
            tagClass = 'tag-primary';
            if (secondary)
                tagClass = 'tag-secondary';
        }

        return (
            <span className={ classNames([className, 'tag', tagClass]) }>
                { count }
            </span>
        );
    }
})

module.exports.Count = Count
