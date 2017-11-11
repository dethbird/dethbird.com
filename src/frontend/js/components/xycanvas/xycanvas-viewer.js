import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Icon, Segment } from 'semantic-ui-react';

import XYCanvas from 'components/xycanvas/xycanvas';

import { 
    increaseScale,
    decreaseScale,
    panLeft,
    panRight,
    panUp,
    panDown
} from 'actions/xycanvas';


class XYCanvasViewer extends Component {
    constructor(props) {
        super(props);
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handlePanLeft = this.handlePanLeft.bind(this);
        this.handlePanRight = this.handlePanRight.bind(this);
        this.handlePanUp = this.handlePanUp.bind(this);
        this.handlePanDown = this.handlePanDown.bind(this);
    }
    handleZoomIn() {
        const { dispatch, params } = this.props;
        dispatch(increaseScale(params));
    }
    handleZoomOut() {
        const { dispatch, params } = this.props;
        dispatch(decreaseScale(params));
    }
    handlePanLeft() {
        const { dispatch, params } = this.props;
        dispatch(panLeft(params));
    }
    handlePanRight() {
        const { dispatch, params } = this.props;
        dispatch(panRight(params));
    }
    handlePanUp() {
        const { dispatch, params } = this.props;
        dispatch(panUp(params));
    }
    handlePanDown() {
        const { dispatch, params } = this.props;
        dispatch(panDown(params));
    }
    render() {
        const { layout, params } = this.props;
        const { 
            handleZoomIn,
            handleZoomOut,
            handlePanLeft,
            handlePanRight,
            handlePanUp,
            handlePanDown
        } = this;

        return (
            <div className="canvas-viewer" style={{}} >
                <Segment compact textAlign='center' className='controls'>
                    <Button.Group icon>
                        <Button onClick={() => { handleZoomIn() } }>
                            <Icon name='zoom' />
                        </Button>
                        <Button onClick={() => { handleZoomOut() }}>
                            <Icon name='zoom out' />
                        </Button>
                        <Button onClick={() => { handlePanLeft() }}>
                            <Icon name='arrow left' />
                        </Button>
                        <Button onClick={() => { handlePanRight() }}>
                            <Icon name='arrow right' />
                        </Button>
                        <Button onClick={() => { handlePanUp() }}>
                            <Icon name='arrow up' />
                        </Button>
                        <Button onClick={() => { handlePanDown() }}>
                            <Icon name='arrow down' />
                        </Button>
                    </Button.Group>
                </Segment>
                <XYCanvas layout={layout} params={ params } />
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
