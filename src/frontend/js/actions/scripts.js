import request from 'superagent';
import {
    GET_SCRIPTS_REQUEST,
    GET_SCRIPTS_ERROR,
    GET_SCRIPTS_SUCCESS,
} from '../constants/actions';

const getScriptsInit = () => {
    return {
        type: GET_SCRIPTS_REQUEST
    }
}

const getScriptsSuccess = (scripts) => {
    return {
        type: GET_SCRIPTS_SUCCESS,
        scripts: scripts
    }
}

const getScriptsError = () => {
    return {
        type: GET_SCRIPTS_ERROR
    }
}

export const getScripts = () =>
    dispatch => {
        dispatch(getScriptsInit());
        request.get('/api/project_scripts')
            .then((res) => dispatch(getScriptsSuccess(res.body)))
            .catch(() => dispatch(getScriptsError()));
    };
