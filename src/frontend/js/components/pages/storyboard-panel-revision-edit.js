import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { Card } from '../ui/card'
import { SectionHeader } from '../ui/section-header'
import { CardClickable } from '../ui/card-clickable'
import { CardBlock } from '../ui/card-block'
import { ContentEdit } from '../ui/content-edit'
import { Description } from '../ui/description'
import { ImagePanelRevision } from '../ui/image-panel-revision'
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
            changedFields: {}
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
    // componentDidMount() {
    //     $.ajaxSetup({
    //         beforeSend: function() {
    //             this.setState({
    //                 formState: 'info',
    //                 formMessage: 'Working.',
    //             })
    //         }.bind(this)
    //     });
    //     $.ajax({
    //         url: '/api/project/' + this.props.params.projectId,
    //         dataType: 'json',
    //         cache: false,
    //         success: function(data) {
    //
    //             let storyboard = _.findWhere(data.storyboards, {
    //                 'id': parseInt(this.props.params.storyboardId)
    //             });
    //             let panel = _.findWhere(storyboard.panels, {
    //                 'id': parseInt(this.props.params.panelId)
    //             });
    //             let revision = _.findWhere(panel.revisions, {
    //                 'id': parseInt(this.props.params.revisionId)
    //             });
    //
    //             let changedFields = null
    //             let submitUrl = '/api/project_storyboard_panel_revision/'
    //                 + this.props.params.revisionId
    //             let submitMethod = 'PUT'
    //
    //             if (!revision) {
    //                 revision = {
    //                     name: '',
    //                     content: '',
    //                     description: ''
    //                 };
    //                 submitUrl = '/api/project_storyboard_panel_revision'
    //                 submitMethod = 'POST'
    //
    //                 changedFields = {
    //                     panel_id: this.props.params.panelId
    //                 }
    //             }
    //
    //             this.setState({
    //                 project: data,
    //                 storyboard: storyboard,
    //                 panel: panel,
    //                 revision: revision,
    //                 formState: null,
    //                 formMessage: null,
    //                 submitUrl: submitUrl,
    //                 submitMethod: submitMethod,
    //                 changedFields: changedFields
    //             });
    //         }.bind(this),
    //         error: function(xhr, status, err) {
    //             console.error(this.props.url, status, err.toString());
    //         }.bind(this)
    //     });
    // },
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
        let changedFields = this.state.changedFields || {};

        changedFields[event.target.id] = event.target.value
        console.log(changedFields);
        this.setState({
            changedFields: changedFields
        })
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
        console.log('project', project);
        if (!project)
            return <UiState state={ ui_state } />
        return this.renderBody();
    },
    renderBody() {
        const { ui_state, project, storyboard, panel, revision, form_mode } = this.props;
        const {
            projectId,
            storyboardId,
            panelId,
            revisionId
        } = this.props.params;

        const { changedFields } = this.state;

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

                    <div className="form-group text-align-center">
                        <button
                            className="btn btn-secondary"
                            onClick={ this.handleClickCancel }
                        >Cancel</button>
                        <button
                            className="btn btn-success"
                            onClick={ this.handleClickSubmit }
                            disabled={ !changedFields }
                        >Save</button>
                    </div>
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
