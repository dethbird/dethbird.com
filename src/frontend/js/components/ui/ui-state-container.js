import React, { Component } from 'react';
import PropTypes from 'prop-types'
import LinearProgress from 'material-ui/LinearProgress';

import { UI_STATE } from 'constants/ui-state';

class UiStateContainer extends Component {
    render() {
        const { uiState } = this.props;

        if (uiState == UI_STATE.REQUESTING)
            return <LinearProgress mode="indeterminate" />;

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
};

UiStateContainer.propTypes = {
    uiState: PropTypes.string.isRequired
};

export default UiStateContainer;
