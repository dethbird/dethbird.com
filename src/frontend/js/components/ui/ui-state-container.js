import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Dimmer, Loader } from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';

class UiStateContainer extends Component {
    render() {
        const { uiState } = this.props;

        if (uiState == UI_STATE.REQUESTING)
            return <Dimmer active inverted><Loader inverted/></Dimmer>

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
