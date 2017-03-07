import classNames from 'classnames';
import React from 'react';

import Description from '../ui/description';

const Element = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        element: React.PropTypes.object.isRequired,
        windowScrollX: React.PropTypes.number,
        windowScrollY: React.PropTypes.number
    },
    compileStyle(){
        const { element, windowScrollX, windowScrollY } = this.props;

        let parallaxShiftX = 0;
        if (element.parallax_x)
            parallaxShiftX = (windowScrollX / element.parallax_x.depth);

        let parallaxShiftY = 0;
        if (element.parallax_y)
            parallaxShiftY = (windowScrollY / element.parallax_y.depth);

        let style = {};
        if (element.position)
            style = {
                ... style,
                left: element.position.left + windowScrollX - parallaxShiftX,
                top: element.position.top + windowScrollY - parallaxShiftY
            }
        if (element.dimensions)
            style = {
                ... style,
                width: element.dimensions.width,
                height: element.dimensions.height
            }
        return style;
    },
    renderTag() {
        const { element } = this.props;
        if (element.tag=="image")
            return (
                <img src={ element.src } />
            )
        if (element.tag=="markdown")
            return (
                <Description source={ element.markdown } />
            )
        return null;
    },
    render: function() {
        const { className, element, windowScrollX } = this.props;
        const elementClasses = element.classes!==undefined ? element.classes : null;
        return (
            <div
                className={ classNames([className, elementClasses, 'element']) }
                style={ this.compileStyle() }
                id={ element.id }
                onMouseDown={ function(e){
                    e.preventDefault();
                }}
            >
                { this.renderTag() }
            </div>
        );
    }
})

export default Element;
