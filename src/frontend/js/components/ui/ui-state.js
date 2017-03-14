import React from 'react';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_SUCCESS,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

const UiState = React.createClass({

    propTypes: {
        uiState: React.PropTypes.string,
        message: React.PropTypes.string
    },

    render: function() {
        const { state, message } = this.props;

        switch (state) {
            case UI_STATE_INITIALIZING:
                return (
                    <div>Initializing</div>
                );
            case UI_STATE_REQUESTING:
                return (
                    <div>Requesting</div>
                );
            case UI_STATE_ERROR:
                return (
                    <div>Error.</div>
                );
            case UI_STATE_SUCCESS:
                return (
                    <div>Success.</div>
                );
            case UI_STATE_COMPLETE:
            default:
                return null;
        }
    }
})

export default UiState
