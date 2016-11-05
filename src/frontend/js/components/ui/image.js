import React from 'react'

import classNames from 'classnames';

const Image = React.createClass({

    propTypes: {
        src: React.PropTypes.string,
        className: React.PropTypes.string
    },

    render: function() {
        const { src, className } = this.props
        
        return (
            <img
                className={ classNames([className, 'image']) }
                src={ src ? src : 'https://c1.staticflickr.com/9/8185/29446313350_0a95598297_b.jpg' }
            />
        );
    }
})

module.exports.Image = Image
