import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { compileStyle, computeStyleWithParams } from 'utility/layout';
import XYElement from 'components/xycanvas/xyelement';

class XYCanvas extends Component {
    render() {
        const { layout, params } = this.props;
        const style = compileStyle(layout.canvas);
        const computedStyle = computeStyleWithParams(style, params);
        const elementNodes = layout.elements.map(function (element, i) {
            return (
                <XYElement 
                    element={ element }
                    params={ params }
                    key={ i }
                />
            );
        });

        return (
            <div className="canvas" style={ computedStyle } id={ layout.canvas.id }>
                { elementNodes }
            </div>
        );
    }
};

XYCanvas.propTypes = {
    layout: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};

export default XYCanvas;
