import classNames from 'classnames';
import React from 'react';

const Element = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        element: React.PropTypes.object.isRequired
    },
    compileStyle(){
        const { element } = this.props;
        let style = {};
        if (element.position)
            style = {
                ... style,
                left: element.position.left,
                top: element.position.top
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
        return null;
    },
    render: function() {
        const { className, element } = this.props;

        return (
            <div className={ classNames([className, 'element']) } style={ this.compileStyle() }>
                { this.renderTag() }
            </div>
        );
    }
})

export default Element;
