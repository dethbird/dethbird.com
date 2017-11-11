import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import XYCanvas from 'components/xycanvas/xycanvas';

class XYCanvasViewer extends Component {
    render() {
        const { layout, params } = this.props;
        console.log(params);
        return (
            <div className="canvas-viewer" style={{}} >
                <div>controls</div>
                <XYCanvas layout={layout} />
            </div>
        );
    }
};

XYCanvasViewer.propTypes = {
    layout: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const params = state.xycanvasReducer;
    return {
        params
    }
}
export default connect(mapStateToProps)(XYCanvasViewer);
