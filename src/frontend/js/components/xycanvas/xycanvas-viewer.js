import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Icon, Segment } from 'semantic-ui-react';

import XYCanvas from 'components/xycanvas/xycanvas';

import { 
    increaseScale,
    decreaseScale 
} from 'actions/xycanvas';


class XYCanvasViewer extends Component {
    constructor(props) {
        super(props);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }
    zoomIn() {
        const { dispatch, params } = this.props;
        dispatch(increaseScale(params));
    }
    zoomOut() {
        const { dispatch, params } = this.props;
        dispatch(decreaseScale(params));
    }
    render() {
        const { layout, params } = this.props;
        const { 
            zoomIn,
            zoomOut
        } = this;
        
        return (
            <div className="canvas-viewer" style={{}} >
                <Segment compact textAlign='center' className='controls'>
                    <Button.Group icon>
                        <Button onClick={ () => { zoomIn() } }>
                            <Icon name='zoom' />
                        </Button>
                        <Button onClick={() => { zoomOut() }}>
                            <Icon name='zoom out' />
                        </Button>
                        <Button>
                            <Icon name='arrow left' />
                        </Button>
                        <Button>
                            <Icon name='arrow right' />
                        </Button>
                        <Button>
                            <Icon name='arrow up' />
                        </Button>
                        <Button>
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
