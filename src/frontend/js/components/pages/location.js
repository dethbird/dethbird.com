import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import {CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import { LocationBreadcrumb } from './location/location-breadcrumb'
import { Card } from '../ui/card'
import { CardBlock } from '../ui/card-block'
import { Description } from '../ui/description'
import { FountainFull } from '../ui/fountain-full'
import { Image } from "../ui/image"
import { HeaderPage } from "../ui/header-page"
import { HeaderPageButton } from "../ui/header-page-button"
import { SectionHeader } from '../ui/section-header'
import UiState from '../ui/ui-state'

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';
import { getLocation } from  '../../actions/location'


const Location = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, locationId } = this.props.params;
        dispatch(getLocation(projectId, locationId));
    },
    render() {
        const { ui_state, project, location, className } = this.props;

        if(!location)
            return <UiState state={ ui_state } />

        return (
            <div className="locationPage">

                <LocationBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <HeaderPage title={ location.name }>
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/location/${location.id}/edit`)}
                        title="Edit"
                    />
                </HeaderPage>

                <Image src={ location.content } />
                <br />

                <Card className='input-card'>
                    <CardText>
                        <Description source={ location.description }  />
                    </CardText>
                </Card>

            </div>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, location, project } = state.location;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        project,
        location
    }
}

export default connect(mapStateToProps)(Location);
