import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import {CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import { ScriptBreadcrumb } from './script/script-breadcrumb'
import { Card } from '../ui/card'
import { CardBlock } from '../ui/card-block'
import { Description } from '../ui/description'
import { FountainFull } from '../ui/fountain-full'
import { HeaderPage } from "../ui/header-page"
import { HeaderPageButton } from "../ui/header-page-button"
import { SectionHeader } from '../ui/section-header'
import UiState from '../ui/ui-state'

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';
import { getScript } from  '../../actions/script'


const Script = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        const { scriptId } = this.props.params;
        dispatch(getScript(scriptId));
    },
    render() {
        const { ui_state, script, className } = this.props;

        if(!script)
            return <UiState state={ ui_state } />

        return (
            <div className="scriptPage">

                <ScriptBreadcrumb script={ this.props } />

                <UiState state={ ui_state } />

                <HeaderPage title={ script.name }>
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/script/' + script.id + '/edit')}
                        title="Edit"
                    />
                </HeaderPage>

                <Card className='input-card'>
                    <CardTitle title="Description"/>
                    <CardText>
                        <Description source={ script.description }  />
                    </CardText>
                </Card>

                <Card className='input-card'>
                    <CardTitle title="Script"/>
                    <CardText>
                        <FountainFull source={ script.script } />
                    </CardText>
                </Card>

            </div>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, script } = state.script;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        script: script
    }
}

export default connect(mapStateToProps)(Script);
