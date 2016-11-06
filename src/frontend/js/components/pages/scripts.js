import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'

import { Script } from "./scripts/script"
import { HeaderPage } from "../ui/header-page"
import { HeaderPageButton } from "../ui/header-page-button"
import {
    ScriptsBreadcrumb
} from './scripts/scripts-breadcrumb'
import UiState from '../ui/ui-state'

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';
import { getScripts } from  '../../actions/scripts'

const Scripts = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getScripts());
    },
    render() {

        const { ui_state, scripts } = this.props

        let scriptNodes = null;

        if(scripts)
            scriptNodes = scripts.map(function(script) {
                return (
                    <Script
                        className="col-lg-6"
                        script={ script }
                        key={ script.id }
                    >
                    </Script>
                );
            });

        return (
            <div>
                <ScriptsBreadcrumb script={ this.props } />

                <UiState state={ ui_state } />

                <HeaderPage title="Scripts">
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/script/add')}
                        title="Add"
                    />
                </HeaderPage>

                <div className="scriptsList">
                    { scriptNodes }
                </div>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, scripts } = state.scripts;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        scripts: scripts
    }
}

export default connect(mapStateToProps)(Scripts);
