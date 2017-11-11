import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Icon, Segment } from 'semantic-ui-react';

import XYCanvas from 'components/xycanvas/xycanvas';


class XYCanvasViewer extends Component {
    render() {
        const { layout, params } = this.props;
        console.log(params);
        return (
            <div className="canvas-viewer" style={{}} >
                <Segment compact textAlign='center' className='controls'>
                    <Button.Group icon>
                        <Button>
                            <Icon name='zoom' />
                        </Button>
                        <Button>
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
