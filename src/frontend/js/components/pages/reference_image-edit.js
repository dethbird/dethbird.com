import React from 'react'
import {
    SortableItems,
    SortableItem
} from 'react-sortable-component'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { CardActions, CardText } from 'material-ui/Card';

import InputText from '../ui/input-text'

import { Card } from '../ui/card'
import { ButtonsForm } from '../ui/buttons-form'
import { ContentEdit } from '../ui/content-edit'
import { Description } from '../ui/description'
import InputDescription from '../ui/input-description'
import { FountainFull } from '../ui/fountain-full'
import {
    ReferenceImageBreadcrumb
} from './reference_image/reference_image-breadcrumb'

import UiState from '../ui/ui-state'
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../../constants/form';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import {
    getReferenceImage,
    postReferenceImage,
    putReferenceImage,
    resetReferenceImage
} from  '../../actions/reference-image'

const ReferenceImageEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                name: null,
                content: null,
                description: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { reference_image } = this.props;
        if( reference_image==undefined && nextProps.reference_image){
            this.setState({
                changedFields: {
                    name: nextProps.reference_image.name,
                    content: nextProps.reference_image.content,
                    description: nextProps.reference_image.description
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, referenceImageId } = this.props.params;
        dispatch(getReferenceImage(projectId, referenceImageId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, project, reference_image } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetReferenceImage( project, reference_image, form_mode ));
    },
    handleClickCancel(event) {
        event.preventDefault()
        browserHistory.push(
            '/project/' + this.props.params.projectId
            + '/reference_image/' + this.props.params.referenceImageId
        )
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project, reference_image } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postReferenceImage(project, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putReferenceImage( project, reference_image, changedFields));
    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, project, reference_image } = this.props;
        const getErrorForId = (id) => {
            const error = _.findWhere(errors, {
                'property': id
            });
            if(error)
                return error.message
            return null;
        }

        return (
            <div>

                <ReferenceImageBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <form>

                    <ContentEdit
                        id="content"
                        value={ changedFields.content || '' }
                        handleFieldChange={ this.handleFieldChange }
                        errorText={ getErrorForId('content') }
                    />

                    <InputText
                        label="Name"
                        id="name"
                        value={ changedFields.name || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('name') }
                    />

                    <InputDescription
                        label="Description"
                        id="description"
                        value={ changedFields.description || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('description') }
                    />

                    <Card className='input-card'>
                        <CardText>
                            <Description source={ changedFields.description }  />
                        </CardText>
                    </Card>

                    <ButtonsForm
                        handleClickCancel={ this.handleClickCancel }
                        handleClickSubmit={ this.handleClickSubmit }
                    />

                </form>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    const { ui_state, form_mode, errors, project, reference_image } = state.referenceImage;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        errors,
        project,
        reference_image
    }
}

export default connect(mapStateToProps)(ReferenceImageEdit);
