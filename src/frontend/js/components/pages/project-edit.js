import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { CardActions, CardText } from 'material-ui/Card';

import InputText from '../ui/input-text'

import { Card } from '../ui/card'
import { ButtonsForm } from '../ui/buttons-form'
import { Description } from '../ui/description'
import InputDescription from '../ui/input-description'
import { ContentEdit } from "../ui/content-edit"
import {
    ProjectBreadcrumb
} from "./project/project-breadcrumb"
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
    getProject,
    postProject,
    putProject,
    resetProject
} from  '../../actions/project'


const ProjectEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                content: null,
                name: null,
                slugline: null,
                description: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { project } = this.props;
        if( project==undefined && nextProps.project){
            this.setState({
                changedFields: {
                    content: nextProps.project.content,
                    name: nextProps.project.name,
                    slugline: nextProps.project.slugline,
                    description: nextProps.project.description
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId } = this.props.params;
        dispatch(getProject(projectId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, project } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetProject( project, form_mode ));
    },
    handleClickCancel(event) {
        event.preventDefault()
        browserHistory.push(
            '/projects'
        )
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postProject(changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putProject( project, changedFields));
    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, project } = this.props;
        const getErrorForId = (id) => {
            const error = _.findWhere(errors, {
                'property': id
            });
            if(error)
                return error.message
            return null;
        };

        return (
            <div>
                <ProjectBreadcrumb { ...this.props } />

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

                    <InputText
                        label="Slugline"
                        id="slugline"
                        value={ changedFields.slugline || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('slugline') }
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
    const { ui_state, form_mode, errors, project } = state.project;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        errors,
        project
    }
}

export default connect(mapStateToProps)(ProjectEdit);
