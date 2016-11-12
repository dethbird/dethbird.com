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
    LocationBreadcrumb
} from './location/location-breadcrumb'

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
    getLocation,
    postLocation,
    putLocation,
    resetLocation
} from  '../../actions/location'

const LocationEdit = React.createClass({
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
        const { location } = this.props;
        if( location==undefined && nextProps.location){
            this.setState({
                changedFields: {
                    name: nextProps.location.name,
                    content: nextProps.location.content,
                    description: nextProps.location.description
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, locationId } = this.props.params;
        dispatch(getLocation(projectId, locationId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, project, location } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetLocation( project, location, form_mode ));
    },
    handleClickCancel(event) {
        event.preventDefault()
        browserHistory.push(
            '/project/' + this.props.params.projectId
        )
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project, location } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postLocation(project, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putLocation( project, location, changedFields));
    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, project, location } = this.props;
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

                <LocationBreadcrumb { ...this.props } />

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
    const { ui_state, form_mode, errors, project, location } = state.location;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        errors,
        project,
        location
    }
}

export default connect(mapStateToProps)(LocationEdit);
