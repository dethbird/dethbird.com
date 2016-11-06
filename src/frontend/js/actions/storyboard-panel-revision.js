import request from 'superagent';
import {
    GET_STORYBOARD_PANEL_REVISION_REQUEST,
    GET_STORYBOARD_PANEL_REVISION_ERROR,
    GET_STORYBOARD_PANEL_REVISION_SUCCESS,
    GET_STORYBOARD_PANEL_REVISION_FIELD_CHANGE,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

const defaultRevision = {
    content: '',
    description: ''
}

const getStoryboardPanelRevisionInit = () => {
    return {
        type: GET_STORYBOARD_PANEL_REVISION_REQUEST
    }
}

const getStoryboardPanelRevisionSuccess = (project, storyboard, panel, revision, form_mode) => {
    return {
        type: GET_STORYBOARD_PANEL_REVISION_SUCCESS,
        project,
        storyboard,
        panel,
        revision,
        form_mode
    }
}

const getStoryboardPanelRevisionError = () => {
    return {
        type: GET_STORYBOARD_PANEL_REVISION_ERROR
    }
}


export const getStoryboardPanelRevision = (projectId, storyboardId, panelId, revisionId) =>
    dispatch => {
        dispatch(getStoryboardPanelRevisionInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const storyboard = _.findWhere(project.storyboards, {
                    'id': parseInt(storyboardId)
                });
                const panel = _.findWhere(storyboard.panels, {
                    'id': parseInt(panelId)
                });
                const revision = _.findWhere(panel.revisions, {
                    'id': parseInt(revisionId)
                });
                const form_mode = revision ? FORM_MODE_EDIT : FORM_MODE_ADD;

                dispatch(getStoryboardPanelRevisionSuccess(
                    project,
                    storyboard,
                    panel,
                    revision ? revision : defaultRevision,
                    form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getStoryboardPanelRevisionError())
            });
    };
