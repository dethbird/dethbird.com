import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
var moment = require('moment');

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { CardActions, CardText } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';

import { ButtonsForm } from '../ui/buttons-form'
import { Card } from "../ui/card"
import { SectionHeader } from "../ui/section-header"
import { CardClickable } from "../ui/card-clickable"
import { Description } from "../ui/description"
import InputDescription from '../ui/input-description'
import { ImagePanelRevision } from "../ui/image-panel-revision"
import {
    StoryboardPanelBreadcrumb
} from "./storyboard-panel/storyboard-panel-breadcrumb"

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
    getStoryboardPanelComment,
    postStoryboardPanelComment,
    putStoryboardPanelComment,
    resetStoryboardPanelComment
} from  '../../actions/storyboard-panel-comment'

const StoryboardPanelCommentEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                user_id: null,
                comment: null,
                date_added: moment().format('YYYY-MM-DD'),
                status: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { comment } = this.props;
        if( comment==undefined && nextProps.comment){
            this.setState({
                changedFields: {
                    user_id: nextProps.comment.user_id,
                    comment: nextProps.comment.comment,
                    date_added: nextProps.comment.date_added,
                    status: nextProps.comment.status
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
            commentId
        } = this.props.params;

        dispatch(getStoryboardPanelComment(
            projectId,
            storyboardId,
            panelId,
            commentId));
    },
    handleDateAddedFieldChange(event, date) {
        this.handleFieldChange({
            target: {
                id: 'date_added',
                value: moment(date).format("YYYY-MM-DD")
            }
        });
    },
    handleUserFieldChange(event, key, payload) {
        this.handleFieldChange({
            target: {
                id: 'user_id',
                value: payload
            }
        });
    },
    handleStatusFieldChange(event, key, payload) {
        this.handleFieldChange({
            target: {
                id: 'status',
                value: payload
            }
        });
    },
    handleFieldChange(event) {
        const { dispatch, project, storyboard, panel, comment, form_mode } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;
        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetStoryboardPanelComment( project, storyboard, panel, comment, form_mode ));
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

        event.preventDefault();
        const { dispatch, form_mode, project, storyboard, panel, comment } = this.props;
        const { changedFields } = this.state;

        if(form_mode == FORM_MODE_ADD)
            dispatch(postStoryboardPanelComment(project, storyboard, panel, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putStoryboardPanelComment( project, storyboard, panel, comment, changedFields));
    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, project, storyboard, panel, comment, form_mode, errors } = this.props;
        const getErrorForId = (id) => {
            const error = _.findWhere(errors, {
                'property': id
            });
            if(error)
                return error.message
            return null;
        }

        let userOptionsNodes = null;
        if (project)
            userOptionsNodes = project.users.map(function(user) {
                return (
                    <MenuItem value={ user.id } key={ user.id } primaryText={ user.username } />
                );
            });
        return (
            <div>
                <StoryboardPanelBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <form>

                    <SelectField
                        floatingLabelText="User"
                        value={ changedFields.user_id }
                        onChange={ this.handleUserFieldChange }
                        id="user_id"
                        errorText={ getErrorForId('user_id') }
                        className="input-select"
                    >
                        { userOptionsNodes }
                    </SelectField>

                    <InputDescription
                        label="Comment"
                        id="comment"
                        value={ changedFields.comment || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('comment') }
                    />

                    <Card className='input-card'>
                        <CardText>
                            <Description source={ changedFields.comment }  />
                        </CardText>
                    </Card>


                    <DatePicker
                        value={ changedFields.date_added ? new Date(changedFields.date_added) : new Date() }
                        hintText="Date"
                        onChange={ this.handleDateAddedFieldChange }
                        id="date_added"
                        errorText={ getErrorForId('date_added') }
                        className='input-date'
                        autoOk={ true }
                    />

                    <SelectField
                        floatingLabelText="Status"
                        value={ changedFields.status }
                        onChange={ this.handleStatusFieldChange }
                        id="status"
                        errorText={ getErrorForId('status') }
                        className="input-select"
                    >
                        <MenuItem value="new" primaryText="New" />
                        <MenuItem value="resolved" primaryText="Resolved" />
                    </SelectField>

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
    const { ui_state, project, storyboard, panel, comment, form_mode, errors } = state.storyboardPanelComment;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        project,
        storyboard,
        panel,
        comment,
        errors
    }
}

export default connect(mapStateToProps)(StoryboardPanelCommentEdit);
