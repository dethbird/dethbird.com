import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import {CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import { ReferenceImageBreadcrumb } from './reference_image/reference_image-breadcrumb'
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
import { getReferenceImage } from  '../../actions/reference-image'


const ReferenceImage = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, referenceImageId } = this.props.params;
        dispatch(getReferenceImage(projectId, referenceImageId));
    },
    render() {
        const { ui_state, project, reference_image, className } = this.props;

        if(!reference_image)
            return <UiState state={ ui_state } />

        return (
            <div className="reference_imagePage">

                <ReferenceImageBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <HeaderPage title={ reference_image.name }>
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/reference_image/${reference_image.id}/edit`)}
                        title="Edit"
                    />
                </HeaderPage>

                <Image src={ reference_image.content } />
                <br />

                <Card className='input-card'>
                    <CardText>
                        <Description source={ reference_image.description }  />
                    </CardText>
                </Card>

            </div>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, reference_image, project } = state.referenceImage;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        project,
        reference_image
    }
}

export default connect(mapStateToProps)(ReferenceImage);
