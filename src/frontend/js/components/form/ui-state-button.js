import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import { UI_STATE } from 'constants/ui-state';

class UiStateButton extends Component {
    render() {
        const { uiState, successMessage } = this.props;

        if (uiState == UI_STATE.REQUESTING)
            return <CircularProgress />;

        return (
            <div>
                <Snackbar
                    open={ uiState == UI_STATE.SUCCESS }
                    action="redirecting ..."
                    message={ successMessage }
                />
                { this.props.children }
            </div>
        );
    }
};

UiStateButton.propTypes = {
    uiState: PropTypes.string,
    successMessage: PropTypes.string.isRequired
};

export default UiStateButton;
