import request from 'superagent';
import {
    GET_SCRIPT_REQUEST,
    GET_SCRIPT_ERROR,
    GET_SCRIPT_SUCCESS,
} from '../constants/actions';

const getScriptInit = () => {
    return {
        type: GET_SCRIPT_REQUEST
    }
}

const getScriptSuccess = (script) => {
    return {
        type: GET_SCRIPT_SUCCESS,
        script: script
    }
}

const getScriptError = () => {
    return {
        type: GET_SCRIPT_ERROR
    }
}

export const getScript = (scriptId) =>
    dispatch => {
        dispatch(getScriptInit());
        request.get('/api/project_script/' + scriptId)
            .then((res) => dispatch(getScriptSuccess(res.body)))
            .catch(() => dispatch(getScriptError()));
    };
