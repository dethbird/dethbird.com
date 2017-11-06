import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { compileStyle } from 'utility/layout';
import Markdown from 'components/ui/markdown';

class XYElement extends Component {
    renderTag() {
        const { element } = this.props;
        if (element.type == "image")
            return (
                <img className='element-image' src={element.src} />
            )
        if (element.type == "markdown")
            return (
                <Markdown source={element.markdown} />
            )
        return null;
    }
    render() {
        const { element } = this.props;
        const elementClasses = element.classes || null;
        const style = compileStyle(element);
        return (
            <div 
                className={classNames(['element', elementClasses])}
                style={ style }
                id={ element.id }
            >
                { this.renderTag() }
            </div>
        );
    }
};

XYElement.propTypes = {
    element: PropTypes.object.isRequired
};

export default XYElement;
