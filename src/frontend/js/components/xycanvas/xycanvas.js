import React, { Component } from 'react';
import PropTypes from 'prop-types'

class XYCanvas extends Component {
    render() {
        const { layout } = this.props;
        return <div>{ layout.canvas.id }</div>;
    }
};

XYCanvas.propTypes = {
    layout: PropTypes.object.isRequired
};

export default XYCanvas;
