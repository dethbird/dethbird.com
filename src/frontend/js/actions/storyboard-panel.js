import request from 'superagent';
import {
    GET_STORYBOARD_PANEL_REQUEST,
    GET_STORYBOARD_PANEL_ERROR,
    GET_STORYBOARD_PANEL_SUCCESS,
    POST_STORYBOARD_PANEL_REQUEST,
    POST_STORYBOARD_PANEL_ERROR,
    POST_STORYBOARD_PANEL_SUCCESS,
    PUT_STORYBOARD_PANEL_REQUEST,
    PUT_STORYBOARD_PANEL_ERROR,
    PUT_STORYBOARD_PANEL_SUCCESS,
    REORDER_STORYBOARD_PANEL_REVISIONS_REQUEST,
    REORDER_STORYBOARD_PANEL_REVISIONS_ERROR,
    REORDER_STORYBOARD_PANEL_REVISIONS_SUCCESS,
    RESET_STORYBOARD_PANEL,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getStoryboardPanelInit = () => {
    return {
        type: GET_STORYBOARD_PANEL_REQUEST
    }
}

const getStoryboardPanelSuccess = (project, storyboard, panel, form_mode) => {
    return {
        type: GET_STORYBOARD_PANEL_SUCCESS,
        form_mode,
        project,
        storyboard,
        panel
    }
}

const getStoryboardPanelError = () => {
    return {
        type: GET_STORYBOARD_PANEL_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getStoryboardPanel = (projectId, storyboardId, panelId) =>
    dispatch => {
        dispatch(getStoryboardPanelInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const storyboard = _.findWhere(project.storyboards, {
                    'id': parseInt(storyboardId)
                });
                const panel = _.findWhere(storyboard.panels, {
                    'id': parseInt(panelId)
                });
                const form_mode = panel ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getStoryboardPanelSuccess(project, storyboard, panel, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getStoryboardPanelError())
            });
    };

/** POST */
const postStoryboardPanelInit = ( project, storyboard, panel ) => {
    return {
        type: POST_STORYBOARD_PANEL_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        storyboard,
        panel
    }
}

const postStoryboardPanelSuccess = (project, storyboard, panel) => {
    return {
        type: POST_STORYBOARD_PANEL_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        storyboard,
        panel
    }
}

const postStoryboardPanelError = (project, storyboard, panel, errors) => {
    return {
        type: POST_STORYBOARD_PANEL_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        storyboard,
        panel,
    }
}

export const postStoryboardPanel = (project, storyboard, fields) =>
    dispatch => {
        dispatch(postStoryboardPanelInit());
        request.post('/api/project_storyboard_panel')
            .send( { ...fields, storyboard_id: storyboard.id } )
            .end((err, res) => {
                if(res.ok) {
                    const panel = res.body;
                    dispatch(postStoryboardPanelSuccess(project, storyboard, panel));
                }
                if(!res.ok)
                    dispatch(postStoryboardPanelError(project, storyboard, fields, res.body))
            });
    };

 /** PUT */
const putStoryboardPanelInit = ( project, storyboard,  panel ) => {
    return {
        type: PUT_STORYBOARD_PANEL_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        storyboard,
        panel
    }
}

const putStoryboardPanelSuccess = (project, storyboard, panel) => {
    return {
        type: PUT_STORYBOARD_PANEL_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        storyboard,
        panel
    }
}

const putStoryboardPanelError = (project, storyboard, panel, errors) => {
    return {
        type: PUT_STORYBOARD_PANEL_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        storyboard,
        panel
    }
}

export const putStoryboardPanel = (project, storyboard, panel, fields) =>
    dispatch => {
        dispatch(putStoryboardPanelInit());
        request.put('/api/project_storyboard_panel/' + panel.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putStoryboardPanelSuccess(project, storyboard, r));
                }

                if(!res.ok)
                    dispatch(putStoryboardPanelError(project, storyboard, {...fields, id: panel.id, revisions: panel.revisions }, res.body))
            });
    };

/** REORDER */
const reorderStoryboardPanelRevisionsInit = ( project, storyboard, panel, form_mode ) => {
   return {
       type: REORDER_STORYBOARD_PANEL_REVISIONS_REQUEST,
       form_mode,
       project,
       storyboard,
       panel
   }
}

const reorderStoryboardPanelRevisionsSuccess = (project, storyboard, panel, form_mode) => {
   return {
       type: REORDER_STORYBOARD_PANEL_REVISIONS_SUCCESS,
       form_mode,
       project,
       storyboard,
       panel
   }
}

const reorderStoryboardPanelRevisionsError = (project, storyboard, panel, form_mode, errors) => {
   return {
       type: REORDER_STORYBOARD_PANEL_REVISIONS_ERROR,
       form_mode,
       errors,
       project,
       storyboard,
       panel
   }
}

export const reorderStoryboardPanelRevisions = (project, storyboard, panel, form_mode, items) =>
   dispatch => {
       dispatch(reorderStoryboardPanelRevisionsInit(project, storyboard, panel, form_mode));
       request.post('/api/project_storyboard_panel_revision_order')
           .send({items})
           .end((err, res) => {
               if(res.ok) {
                   dispatch(reorderStoryboardPanelRevisionsSuccess(project, storyboard, panel, form_mode));
               }

               if(!res.ok)
                   dispatch(reorderStoryboardPanelRevisionsError(project, storyboard, panel, form_mode, res.body))
           });
   };

/** RESET */
export const resetStoryboardPanel = (project, storyboard, panel, form_mode) => {
    return {
        type: RESET_STORYBOARD_PANEL,
        form_mode,
        project,
        storyboard,
        panel
    }
}
