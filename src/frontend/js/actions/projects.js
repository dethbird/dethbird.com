import request from 'superagent';
import {
    GET_PROJECTS_REQUEST,
    GET_PROJECTS_ERROR,
    GET_PROJECTS_SUCCESS,
} from '../constants/actions';

const getProjectsInit = () => {
    return {
        type: GET_PROJECTS_REQUEST
    }
}

const getProjectsSuccess = (projects) => {
    return {
        type: GET_PROJECTS_SUCCESS,
        projects: projects
    }
}

const getProjectsError = () => {
    return {
        type: GET_PROJECTS_ERROR
    }
}

export const getProjects = () =>
    dispatch => {
        dispatch(getProjectsInit());
        request.get('/api/projects')
            .then((res) => dispatch(getProjectsSuccess(res.body)))
            .catch(() => dispatch(getProjectsError()));
    };
