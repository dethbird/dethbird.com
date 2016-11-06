import request from 'superagent';
import {
    GET_STORYBOARD_PANEL_REVISION_REQUEST,
    GET_STORYBOARD_PANEL_REVISION_ERROR,
    GET_STORYBOARD_PANEL_REVISION_SUCCESS,
    POST_STORYBOARD_PANEL_REVISION_REQUEST,
    POST_STORYBOARD_PANEL_REVISION_ERROR,
    POST_STORYBOARD_PANEL_REVISION_SUCCESS,
    PUT_STORYBOARD_PANEL_REVISION_REQUEST,
    PUT_STORYBOARD_PANEL_REVISION_ERROR,
    PUT_STORYBOARD_PANEL_REVISION_SUCCESS,
    RESET_STORYBOARD_PANEL_REVISION,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
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
                    revision,
                    form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getStoryboardPanelRevisionError())
            });
    };

/** POST */
const postStoryboardPanelRevisionInit = (project, storyboard, panel, revision) => {
    return {
        type: POST_STORYBOARD_PANEL_REVISION_REQUEST,
        project,
        storyboard,
        panel,
        revision,
        form_mode: FORM_MODE_ADD
    }
}

const postStoryboardPanelRevisionSuccess = (project, storyboard, panel, revision) => {
    return {
        type: POST_STORYBOARD_PANEL_REVISION_SUCCESS,
        project,
        storyboard,
        panel,
        revision,
        form_mode: FORM_MODE_EDIT
    }
}

const postStoryboardPanelRevisionError = ( project, storyboard, panel, revision, errors) => {
    return {
        type: POST_STORYBOARD_PANEL_REVISION_ERROR,
        project,
        storyboard,
        panel,
        revision,
        errors,
        form_mode: FORM_MODE_ADD
    }
}

export const postStoryboardPanelRevision = ( project, storyboard, panel, fields) =>
    dispatch => {
        dispatch(postStoryboardPanelRevisionInit());
        request.post('/api/project_storyboard_panel_revision')
            .send({ ...fields, panel_id: panel.id })
            .end((err, res) => {
                if(res.ok) {
                    const revision = res.body;
                    dispatch(postStoryboardPanelRevisionSuccess(project, storyboard, panel, revision));
                }

                if(!res.ok)
                    dispatch(postStoryboardPanelRevisionError( project, storyboard, panel, fields, res.body))
            });
    };

 /** PUT */
const putStoryboardPanelRevisionInit = (project, storyboard, panel, revision) => {
    return {
        type: PUT_STORYBOARD_PANEL_REVISION_REQUEST,
        project,
        storyboard,
        panel,
        revision,
        form_mode: FORM_MODE_EDIT
    }
}

const putStoryboardPanelRevisionSuccess = (project, storyboard, panel, revision) => {
    return {
        type: PUT_STORYBOARD_PANEL_REVISION_SUCCESS,
        project,
        storyboard,
        panel,
        revision,
        form_mode: FORM_MODE_EDIT
    }
}

const putStoryboardPanelRevisionError = (project, storyboard, panel, revision, errors) => {
    return {
        type: PUT_STORYBOARD_PANEL_REVISION_ERROR,
        project,
        storyboard,
        panel,
        revision,
        form_mode: FORM_MODE_EDIT,
        errors
    }
}

export const putStoryboardPanelRevision = (project, storyboard, panel, revision, fields) =>
    dispatch => {
        dispatch(putStoryboardPanelRevisionInit(project, storyboard, panel, revision));
        request.put('/api/project_storyboard_panel_revision/' + revision.id)
            .send({ ...fields, panel_id: panel.id })
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putStoryboardPanelRevisionSuccess(project, storyboard, panel, r));
                }

                if(!res.ok)
                    dispatch(putStoryboardPanelRevisionError(project, storyboard, panel, {...fields, id: revision.id }, res.body))
            });
    };

/** RESET */
export const resetStoryboardPanelRevision = (project, storyboard, panel, revision, form_mode) => {
    return {
        type: RESET_STORYBOARD_PANEL_REVISION,
        project,
        storyboard,
        panel,
        revision,
        form_mode
    }
}
