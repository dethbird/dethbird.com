import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { UI_STATE } from 'constants/ui-state';

class UiStateContainer extends Component {
    render() {
        const { uiState } = this.props;

        if (uiState == UI_STATE.REQUESTING)
            return <div>loading ...</div>

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
