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

const getScriptSuccess = (script, form_mode) => {
    return {
        type: GET_SCRIPT_SUCCESS,
        script,
        form_mode
    }
}

const getScriptError = () => {
    return {
        type: GET_SCRIPT_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getScript = (scriptId) =>
    dispatch => {
        dispatch(getScriptInit());
        request.get(`/api/project_script/${scriptId}`)
            .then((res) => {
                const script= res.body;
                const form_mode = script ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getScriptSuccess(
                    script,
                    form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getScriptError())
            });
    };

/** POST */
const postScriptInit = ( project, storyboard, panel ) => {
    return {
        type: POST_SCRIPT_REQUEST,
        form_mode: FORM_MODE_ADD
    }
}

const postScriptSuccess = (script) => {
    return {
        type: POST_SCRIPT_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        script
    }
}

const postScriptError = (script, errors) => {
    return {
        type: POST_SCRIPT_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        script,
    }
}

export const postScript = ( fields) =>
    dispatch => {
        dispatch(postScriptInit());
        request.post('/api/project_script')
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const script = res.body;
                    dispatch(postScriptSuccess(script));
                }
                if(!res.ok)
                    dispatch(postScriptError(fields, res.body))
            });
    };

 /** PUT */
const putScriptInit = ( script ) => {
    return {
        type: PUT_SCRIPT_REQUEST,
        form_mode: FORM_MODE_EDIT,
        script
    }
}

const putScriptSuccess = (script) => {
    return {
        type: PUT_SCRIPT_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        script
    }
}

const putScriptError = (script, errors) => {
    return {
        type: PUT_SCRIPT_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        script
    }
}

export const putScript = (script, fields) =>
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
                    dispatch(putScriptError({...fields, id: script.id }, res.body))
            });
    };

/** RESET */
export const resetScript = (script, form_mode) => {
    return {
        type: RESET_SCRIPT,
        form_mode,
        script
    }
}
