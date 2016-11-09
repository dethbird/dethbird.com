import request from 'superagent';
import {
    GET_SCRIPT_REQUEST,
    GET_SCRIPT_ERROR,
    GET_SCRIPT_SUCCESS,
    POST_SCRIPT_REQUEST,
    POST_SCRIPT_ERROR,
    POST_SCRIPT_SUCCESS,
    PUT_SCRIPT_REQUEST,
    PUT_SCRIPT_ERROR,
    PUT_SCRIPT_SUCCESS,
    RESET_SCRIPT,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getScriptInit = () => {
    return {
        type: GET_SCRIPT_REQUEST
    }
}

const getScriptSuccess = (project, script, form_mode) => {
    return {
        type: GET_SCRIPT_SUCCESS,
        form_mode,
        project,
        script
    }
}

const getScriptError = () => {
    return {
        type: GET_SCRIPT_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getScript = (projectId, scriptId) =>
    dispatch => {
        dispatch(getScriptInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const script = _.findWhere(project.scripts, {
                    'id': parseInt(scriptId)
                });
                const form_mode = script ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getScriptSuccess(project, script, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getScriptError())
            });
    };

/** POST */
const postScriptInit = ( project, script ) => {
    return {
        type: POST_SCRIPT_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        script
    }
}

const postScriptSuccess = (project, script) => {
    return {
        type: POST_SCRIPT_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        script
    }
}

const postScriptError = (project, script, errors) => {
    return {
        type: POST_SCRIPT_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        script,
    }
}

export const postScript = (project, fields) =>
    dispatch => {
        dispatch(postScriptInit());
        request.post('/api/project_script')
            .send( { ...fields, project_id: project.id } )
            .end((err, res) => {
                if(res.ok) {
                    const script = res.body;
                    dispatch(postScriptSuccess(project, script));
                }
                if(!res.ok)
                    dispatch(postScriptError(project, fields, res.body))
            });
    };

 /** PUT */
const putScriptInit = ( project, script ) => {
    return {
        type: PUT_SCRIPT_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        script
    }
}

const putScriptSuccess = (project, script) => {
    return {
        type: PUT_SCRIPT_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        script
    }
}

const putScriptError = (project, script, errors) => {
    return {
        type: PUT_SCRIPT_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        script
    }
}

export const putScript = (project, script, fields) =>
    dispatch => {
        dispatch(putScriptInit());
        request.put('/api/project_script/' + script.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putScriptSuccess(r));
                }

                if(!res.ok)
                    dispatch(putScriptError(project, {...fields, id: script.id }, res.body))
            });
    };

/** RESET */
export const resetScript = (project, script, form_mode) => {
    return {
        type: RESET_SCRIPT,
        form_mode,
        project,
        script
    }
}
