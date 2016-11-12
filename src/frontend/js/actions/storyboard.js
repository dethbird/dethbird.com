import request from 'superagent';
import {
    GET_STORYBOARD_REQUEST,
    GET_STORYBOARD_ERROR,
    GET_STORYBOARD_SUCCESS,
    POST_STORYBOARD_REQUEST,
    POST_STORYBOARD_ERROR,
    POST_STORYBOARD_SUCCESS,
    PUT_STORYBOARD_REQUEST,
    PUT_STORYBOARD_ERROR,
    PUT_STORYBOARD_SUCCESS,
    REORDER_STORYBOARD_PANELS_REQUEST,
    REORDER_STORYBOARD_PANELS_ERROR,
    REORDER_STORYBOARD_PANELS_SUCCESS,
    RESET_STORYBOARD,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getStoryboardInit = () => {
    return {
        type: GET_STORYBOARD_REQUEST
    }
}

const getStoryboardSuccess = (project, storyboard, form_mode) => {
    return {
        type: GET_STORYBOARD_SUCCESS,
        form_mode,
        project,
        storyboard
    }
}

const getStoryboardError = () => {
    return {
        type: GET_STORYBOARD_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getStoryboard = (projectId, storyboardId) =>
    dispatch => {
        dispatch(getStoryboardInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const storyboard = _.findWhere(project.storyboards, {
                    'id': parseInt(storyboardId)
                });
                const form_mode = storyboard ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getStoryboardSuccess(project, storyboard, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getStoryboardError())
            });
    };

/** POST */
const postStoryboardInit = ( project, storyboard ) => {
    return {
        type: POST_STORYBOARD_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        storyboard
    }
}

const postStoryboardSuccess = (project, storyboard) => {
    return {
        type: POST_STORYBOARD_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        storyboard
    }
}

const postStoryboardError = (project, storyboard, errors) => {
    return {
        type: POST_STORYBOARD_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        storyboard
    }
}

export const postStoryboard = (project, storyboard, fields) =>
    dispatch => {
        dispatch(postStoryboardInit());
        request.post('/api/project_storyboard')
            .send( { ...fields, storyboard_id: storyboard.id } )
            .end((err, res) => {
                if(res.ok) {
                    const storyboard = res.body;
                    dispatch(postStoryboardSuccess(project, storyboard));
                }
                if(!res.ok)
                    dispatch(postStoryboardError(project, storyboard, fields, res.body))
            });
    };

 /** PUT */
const putStoryboardInit = ( project, storyboard ) => {
    return {
        type: PUT_STORYBOARD_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        storyboard
    }
}

const putStoryboardSuccess = (project, storyboard) => {
    return {
        type: PUT_STORYBOARD_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        storyboard
    }
}

const putStoryboardError = (project, storyboard, errors) => {
    return {
        type: PUT_STORYBOARD_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        storyboard
    }
}

export const putStoryboard = (project, storyboard, fields) =>
    dispatch => {
        dispatch(putStoryboardInit());
        request.put('/api/project_storyboard/' + storyboard.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putStoryboardSuccess(project, r));
                }

                if(!res.ok)
                    dispatch(putStoryboardError(project, {...fields, id: storyboard.id, panels: storyboard.panels }, res.body))
            });
    };

/** REORDER */
const reorderStoryboardRevisionsInit = ( project, storyboard, form_mode ) => {
   return {
       type: REORDER_STORYBOARD_PANELS_REQUEST,
       form_mode,
       project,
       storyboard
   }
}

const reorderStoryboardRevisionsSuccess = (project, storyboard, form_mode) => {
   return {
       type: REORDER_STORYBOARD_PANELS_SUCCESS,
       form_mode,
       project,
       storyboard
   }
}

const reorderStoryboardRevisionsError = (project, storyboard, form_mode, errors) => {
   return {
       type: REORDER_STORYBOARD_PANELS_ERROR,
       form_mode,
       errors,
       project,
       storyboard
   }
}

export const reorderStoryboardRevisions = (project, storyboard, form_mode, items) =>
   dispatch => {
       dispatch(reorderStoryboardRevisionsInit(project, storyboard, form_mode));
       request.post('/api/project_storyboard_panel_order')
           .send({items})
           .end((err, res) => {
               if(res.ok) {
                   dispatch(reorderStoryboardRevisionsSuccess(project, storyboard, form_mode));
               }

               if(!res.ok)
                   dispatch(reorderStoryboardRevisionsError(project, storyboard, form_mode, res.body))
           });
   };

/** RESET */
export const resetStoryboard = (project, storyboard, form_mode) => {
    return {
        type: RESET_STORYBOARD,
        form_mode,
        project,
        storyboard
    }
}
