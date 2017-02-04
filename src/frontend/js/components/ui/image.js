import React from 'react'

import classNames from 'classnames';

const Image = React.createClass({

    propTypes: {
        src: React.PropTypes.string,
        className: React.PropTypes.string
    },

    render: function() {
        const { src, className } = this.props

        const pattern = /^(https:\/\/)/;
        let imageSource = src;
        if(!pattern.test(src))
            imageSource = src ? '/api/externalimage?image=' + src : null;

        return (
            <img
                className={ classNames([className, 'image']) }
                src={ imageSource ? imageSource : 'https://c1.staticflickr.com/9/8185/29446313350_0a95598297_b.jpg' }
            />
        );
    }
});

export default Image;
