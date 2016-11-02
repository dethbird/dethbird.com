import request from 'superagent';
import {
    GET_PROJECT_REQUEST,
    GET_PROJECT_ERROR,
    GET_PROJECT_SUCCESS,
} from '../constants/actions';

const getProjectInit = () => {
    return {
        type: GET_PROJECT_REQUEST
    }
}

const getProjectSuccess = (project) => {
    return {
        type: GET_PROJECT_SUCCESS,
        project: project
    }
}

const getProjectError = () => {
    return {
        type: GET_PROJECT_ERROR
    }
}

export const getProject = (projectId) =>
    dispatch => {
        dispatch(getProjectInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => dispatch(getProjectSuccess(res.body)))
            .catch(() => dispatch(getProjectError()));
    };
