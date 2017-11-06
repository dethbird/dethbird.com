import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { compileStyle } from 'utility/layout';
import XYElement from 'components/xycanvas/xyelement';

class XYCanvas extends Component {
    render() {
        const { layout } = this.props;
        const style = compileStyle(layout.canvas);

        const elementNodes = layout.elements.map(function (element, i) {
            return (
                <XYElement 
                    element={element} 
                    key={i}
                />
            );
        });

        return (
            <div className="canvas" style={ style } id={ layout.canvas.id }>
                { elementNodes }
            </div>
        );
    }
};

XYCanvas.propTypes = {
    layout: PropTypes.object.isRequired
};

export default XYCanvas;
