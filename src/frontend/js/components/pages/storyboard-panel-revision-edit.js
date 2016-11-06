import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { ButtonsForm } from '../ui/buttons-form'
import { ContentEdit } from '../ui/content-edit'
import { Description } from '../ui/description'
import InputDescription from '../ui/input-description'
import { Section } from '../ui/section'
import {
    StoryboardPanelBreadcrumb
} from './storyboard-panel/storyboard-panel-breadcrumb'
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
    getStoryboardPanelRevision,
    postStoryboardPanelRevision,
    putStoryboardPanelRevision,
    resetStoryboardPanelRevision
} from  '../../actions/storyboard-panel-revision'

const StoryboardPanelRevisionEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                content: null,
                description: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { revision } = this.props;
        if( revision==undefined && nextProps.revision){
            this.setState({
                changedFields: {
                    panel_id: nextProps.revision.panel_id,
                    content: nextProps.revision.content,
                    description: nextProps.revision.description
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const {
            projectId,
            storyboardId,
            panelId,
            revisionId
        } = this.props.params;

        dispatch(getStoryboardPanelRevision(
            projectId,
            storyboardId,
            panelId,
            revisionId));
    },
    handleContentSelection(event) {
        event.preventDefault()
        this.handleFieldChange({
            target: {
                id: 'content',
                value: event.target.src
            }
        })
    },
    handleFieldChange(event) {
        const { dispatch, project, storyboard, panel, revision, form_mode } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;
        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetStoryboardPanelRevision( project, storyboard, panel, revision, form_mode ));
    },
    handleClickCancel(event) {
        event.preventDefault();
        browserHistory.push(
            '/project/' + this.props.params.projectId
            + '/storyboard/' + this.props.params.storyboardId
            + '/panel/' + this.props.params.panelId
        );
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project, storyboard, panel, revision } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postStoryboardPanelRevision(project, storyboard, panel, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putStoryboardPanelRevision( project, storyboard, panel, revision, changedFields));

    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, project, storyboard, panel, revision, form_mode, errors } = this.props;
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
                <StoryboardPanelBreadcrumb { ...this.props }></StoryboardPanelBreadcrumb>

                <UiState state={ ui_state } />

                <form>

                    <ContentEdit
                        id="content"
                        value={ changedFields.content || '' }
                        handleFieldChange={ this.handleFieldChange }
                        errorText={ getErrorForId('content') }
                    />

                    <InputDescription
                        label="Description"
                        id="description"
                        value={ changedFields.description || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('description') }
                    />
                    <br />

                    <ButtonsForm
                        handleClickCancel={ this.handleClickCancel }
                        handleClickSubmit={ this.handleClickSubmit }
                    />
                </form>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, project, storyboard, panel, revision, form_mode, errors } = state.storyboardPanelRevision;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        project,
        storyboard,
        panel,
        revision,
        errors
    }
}

export default connect(mapStateToProps)(StoryboardPanelRevisionEdit);
