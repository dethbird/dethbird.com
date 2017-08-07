import request from 'superagent';

import { PROJECTS } from 'constants/actions';

const projectsGetInit = () => {
    return {
        type: PROJECTS.REQUEST
    }
}

const projectsGetSuccess = (projects) => {
    return {
        type: PROJECTS.SUCCESS,
        models: projects
    }
}

const projectsGetError = () => {
    return {
        type: PROJECTS.ERROR
    }
}

export const projectsGet = () =>
    dispatch => {
        dispatch(projectsGetInit());
        request.get('/proxy/api/0.1/projects')
            .then((res) => dispatch(projectsGetSuccess(res.body)))
            .catch(() => dispatch(projectsGetError()));
    };
