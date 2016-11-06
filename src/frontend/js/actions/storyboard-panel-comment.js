import request from 'superagent';
import {
    GET_STORYBOARD_PANEL_COMMENT_REQUEST,
    GET_STORYBOARD_PANEL_COMMENT_ERROR,
    GET_STORYBOARD_PANEL_COMMENT_SUCCESS,
    POST_STORYBOARD_PANEL_COMMENT_REQUEST,
    POST_STORYBOARD_PANEL_COMMENT_ERROR,
    POST_STORYBOARD_PANEL_COMMENT_SUCCESS,
    PUT_STORYBOARD_PANEL_COMMENT_REQUEST,
    PUT_STORYBOARD_PANEL_COMMENT_ERROR,
    PUT_STORYBOARD_PANEL_COMMENT_SUCCESS,
    RESET_STORYBOARD_PANEL_COMMENT,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getStoryboardPanelCommentInit = () => {
    return {
        type: GET_STORYBOARD_PANEL_COMMENT_REQUEST
    }
}

const getStoryboardPanelCommentSuccess = (project, storyboard, panel, comment, form_mode) => {
    return {
        type: GET_STORYBOARD_PANEL_COMMENT_SUCCESS,
        project,
        storyboard,
        panel,
        comment,
        form_mode
    }
}

const getStoryboardPanelCommentError = () => {
    return {
        type: GET_STORYBOARD_PANEL_COMMENT_ERROR
    }
}

export const getStoryboardPanelComment = (projectId, storyboardId, panelId, commentId) =>
    dispatch => {
        dispatch(getStoryboardPanelCommentInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const storyboard = _.findWhere(project.storyboards, {
                    'id': parseInt(storyboardId)
                });
                const panel = _.findWhere(storyboard.panels, {
                    'id': parseInt(panelId)
                });
                const comment = _.findWhere(panel.comments, {
                    'id': parseInt(commentId)
                });
                const form_mode = comment ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getStoryboardPanelCommentSuccess(
                    project,
                    storyboard,
                    panel,
                    comment,
                    form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getStoryboardPanelCommentError())
            });
    };

/** POST */
const postStoryboardPanelCommentInit = ( project, storyboard, panel ) => {
    return {
        type: POST_STORYBOARD_PANEL_COMMENT_REQUEST,
        project,
        storyboard,
        panel,
        form_mode: FORM_MODE_ADD
    }
}

const postStoryboardPanelCommentSuccess = (project, storyboard, panel, comment) => {
    return {
        type: POST_STORYBOARD_PANEL_COMMENT_SUCCESS,
        project,
        storyboard,
        panel,
        comment,
        form_mode: FORM_MODE_EDIT
    }
}

const postStoryboardPanelCommentError = ( project, storyboard, panel, comment, errors) => {
    return {
        type: POST_STORYBOARD_PANEL_COMMENT_ERROR,
        project,
        storyboard,
        panel,
        comment,
        errors,
        form_mode: FORM_MODE_ADD
    }
}

export const postStoryboardPanelComment = ( project, storyboard, panel, fields) =>
    dispatch => {
        dispatch(postStoryboardPanelCommentInit());
        request.post('/api/comment')
            .send({ ...fields, entity_id: panel.id, entity_table_name: 'project_storyboard_panels' })
            .end((err, res) => {
                if(res.ok) {
                    const comment = res.body;
                    dispatch(postStoryboardPanelCommentSuccess(project, storyboard, panel, comment));
                }
                if(!res.ok)
                    dispatch(postStoryboardPanelCommentError( project, storyboard, panel, fields, res.body))
            });
    };

 /** PUT */
const putStoryboardPanelCommentInit = ( project, storyboard, panel, comment ) => {
    return {
        type: PUT_STORYBOARD_PANEL_COMMENT_REQUEST,
        project,
        storyboard,
        panel,
        comment,
        form_mode: FORM_MODE_EDIT
    }
}

const putStoryboardPanelCommentSuccess = (project, storyboard, panel, comment) => {
    return {
        type: PUT_STORYBOARD_PANEL_COMMENT_SUCCESS,
        project,
        storyboard,
        panel,
        comment,
        form_mode: FORM_MODE_EDIT
    }
}

const putStoryboardPanelCommentError = (project, storyboard, panel, comment, errors) => {
    return {
        type: PUT_STORYBOARD_PANEL_COMMENT_ERROR,
        project,
        storyboard,
        panel,
        comment,
        form_mode: FORM_MODE_EDIT,
        errors
    }
}

export const putStoryboardPanelComment = (project, storyboard, panel, comment, fields) =>
    dispatch => {
        dispatch(putStoryboardPanelCommentInit());
        request.put('/api/comment/' + comment.id)
            .send({ ...fields, entity_id: panel.id, entity_table_name: 'project_storyboard_panels' })
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putStoryboardPanelCommentSuccess(project, storyboard, panel, r));
                }

                if(!res.ok)
                    dispatch(putStoryboardPanelCommentError(project, storyboard, panel, fields, res.body))
            });
    };

/** RESET */
export const resetStoryboardPanelComment = (project, storyboard, panel, comment, form_mode) => {
    return {
        type: RESET_STORYBOARD_PANEL_COMMENT,
        project,
        storyboard,
        panel,
        comment,
        form_mode
    }
}
