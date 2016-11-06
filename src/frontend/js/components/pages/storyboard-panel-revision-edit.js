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
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import { getStoryboardPanelRevision } from  '../../actions/storyboard-panel-revision'

const StoryboardPanelRevisionEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                content: null,
                description: null
            }
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
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
    },
    handleClickCancel(event) {
        event.preventDefault()
        browserHistory.push(
            '/project/' + this.props.params.projectId
            + '/storyboard/' + this.props.params.storyboardId
            + '/panel/' + this.props.params.panelId
        )
    },
    handleClickSubmit(event) {
        event.preventDefault()
        var that = this
        $.ajax({
            data: that.state.changedFields,
            dataType: 'json',
            cache: false,
            method: this.state.submitMethod,
            url: this.state.submitUrl,
            success: function(data) {
                this.setState({
                    formState: 'success',
                    formMessage: 'Success.',
                    submitUrl:'/api/project_storyboard_panel_revision/'
                        + data.id,
                    submitMethod: 'PUT',
                    revision: data
                })
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    formState: 'danger',
                    formMessage: 'Error: ' + xhr.responseText
                })
            }.bind(this)
        });
    },
    render() {
        const { ui_state, project } = this.props;

        if (!project)
            return <UiState state={ ui_state } />
        return this.renderBody();
    },
    renderBody() {
        const { changedFields } = this.state;
        const { ui_state, project, storyboard, panel, revision, form_mode } = this.props;
        const {
            projectId,
            storyboardId,
            panelId,
            revisionId
        } = this.props.params;

        return (
            <div>
                <StoryboardPanelBreadcrumb { ...this.props }></StoryboardPanelBreadcrumb>

                <UiState state={ ui_state } />

                <form>

                    <ContentEdit
                        id="content"
                        value={ changedFields.content || '' }
                        handleFieldChange={ this.handleFieldChange }
                    />

                    <InputDescription
                        label="Description"
                        id="description"
                        value={ changedFields.description || '' }
                        onChange= { this.handleFieldChange }
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
    const { ui_state, project, storyboard, panel, revision, form_mode } = state.storyboardPanelRevision;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        project,
        storyboard,
        panel,
        revision
    }
}

export default connect(mapStateToProps)(StoryboardPanelRevisionEdit);
