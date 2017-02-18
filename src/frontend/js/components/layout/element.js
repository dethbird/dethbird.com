import classNames from 'classnames';
import React from 'react';

const Element = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        element: React.PropTypes.object.isRequired,
        windowScrollX: React.PropTypes.number
    },
    compileStyle(){
        const { element, windowScrollX } = this.props;

        let parallaxShiftX = 0;
        if (element.parallax)
            parallaxShiftX = (windowScrollX / element.parallax.depth);

        let style = {};
        if (element.position)
            style = {
                ... style,
                left: element.position.left + windowScrollX - parallaxShiftX,
                top: element.position.top
            }
        if (element.dimensions)
            style = {
                ... style,
                width: element.dimensions.width,
                height: element.dimensions.height
            }

        if (element.id=="bg_shops") {
            console.log(style);
            console.log(parallaxShiftX);
        }
        return style;
    },
    renderTag() {
        const { element } = this.props;
        if (element.tag=="image")
            return (
                <img src={ element.src } />
            )
        return null;
    },
    render: function() {
        const { className, element, windowScrollX } = this.props;
        return (
            <div className={ classNames([className, 'element']) } style={ this.compileStyle() } id={ element.id }>
                { this.renderTag() }
            </div>
        );
    }
})

export default Element;
