import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import Snackbar from 'material-ui/Snackbar'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { pink500, lightGreen500 } from 'material-ui/styles/colors';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_SUCCESS,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

const UiState = React.createClass({

    getInitialState: function() {
        return {
            shouldRender: false
        }
    },

    propTypes: {
        uiState: React.PropTypes.string,
        message: React.PropTypes.string
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            shouldRender: nextProps.state !== this.props.state
        });
    },

    render: function() {
        const { state, message } = this.props;
        const { shouldRender } = this.state;

        if(!shouldRender)
            return null;

        switch (state) {
            case UI_STATE_INITIALIZING:
                return (
                    <RefreshIndicator
                      size={40}
                      top={0}
                      status="loading"
                    />
                )
            case UI_STATE_REQUESTING:
                return (
                    <LinearProgress mode="indeterminate" />
                )
            case UI_STATE_ERROR:
                return (
                    <Snackbar
                        message={ message ? message : 'Error' }
                        open={ true }
                        autoHideDuration={ 1600 }
                        contentStyle={ { color: pink500 }}
                    />
                )
            case UI_STATE_SUCCESS:
                return (
                    <Snackbar
                        message={ message ? message : 'Success' }
                        open={ true }
                        autoHideDuration={ 1600 }
                        contentStyle={ { color: lightGreen500 }}
                    />
                )
            case UI_STATE_COMPLETE:
            default:
                return null;
        }
    }
})

export default UiState
