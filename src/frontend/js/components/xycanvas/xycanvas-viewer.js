import React, { Component } from 'react';
import PropTypes from 'prop-types'

import XYCanvas from 'components/xycanvas/xycanvas';

class XYCanvasViewer extends Component {
    render() {
        const { layout } = this.props;
        return (
            <div className="canvas-viewer" style={{}} >
                <XYCanvas layout={layout} />
            </div>
        );
    }
};

XYCanvasViewer.propTypes = {
    layout: PropTypes.object.isRequired
};

export default XYCanvasViewer;
