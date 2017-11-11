import React, { Component } from 'react';
import { connect } from 'react-redux';


import { getThing } from 'actions/thing';
import Container from 'components/layout/container';
import XYCanvasViewer from 'components/xycanvas/xycanvas-viewer';

import { UI_STATE } from 'constants/ui-state';
import UiStateContainer from 'components/ui/ui-state-container';


class Thing extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getThing(this.props.match.params.name));
    }

    render() {
        const { layout, ui_state } = this.props;
        if (!layout)
            return <UiStateContainer uiState={ui_state} />
        return (
            <XYCanvasViewer layout={ layout } />
        );
    }
};

const mapStateToProps = (state) => {
    const { ui_state, data } = state.thingReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        layout: data
    }
}
export default connect(mapStateToProps)(Thing);
