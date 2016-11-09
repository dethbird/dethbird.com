import request from 'superagent';
import {
    GET_PROJECT_REQUEST,
    GET_PROJECT_ERROR,
    GET_PROJECT_SUCCESS,
    POST_PROJECT_REQUEST,
    POST_PROJECT_ERROR,
    POST_PROJECT_SUCCESS,
    PUT_PROJECT_REQUEST,
    PUT_PROJECT_ERROR,
    PUT_PROJECT_SUCCESS,
    RESET_PROJECT,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getProjectInit = () => {
    return {
        type: GET_PROJECT_REQUEST
    }
}

const getProjectSuccess = (project, form_mode) => {
    return {
        type: GET_PROJECT_SUCCESS,
        form_mode,
        project
    }
}

const getProjectError = () => {
    return {
        type: GET_PROJECT_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getProject = (projectId) =>
    dispatch => {
        dispatch(getProjectInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const form_mode = project ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getProjectSuccess(project, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getProjectError())
            });
    };

/** POST */
const postProjectInit = ( project ) => {
    return {
        type: POST_PROJECT_REQUEST,
        form_mode: FORM_MODE_ADD,
        project
    }
}

const postProjectSuccess = (project) => {
    return {
        type: POST_PROJECT_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project
    }
}

const postProjectError = (project, errors) => {
    return {
        type: POST_PROJECT_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project
    }
}

export const postProject = (fields) =>
    dispatch => {
        dispatch(postProjectInit());
        request.post('/api/project')
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const project = res.body;
                    dispatch(postProjectSuccess(project));
                }
                if(!res.ok)
                    dispatch(postProjectError(fields, res.body))
            });
    };

 /** PUT */
const putProjectInit = ( project ) => {
    return {
        type: PUT_PROJECT_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project
    }
}

const putProjectSuccess = (project) => {
    return {
        type: PUT_PROJECT_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project
    }
}

const putProjectError = (project, errors) => {
    return {
        type: PUT_PROJECT_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project
    }
}

export const putProject = (project, fields) =>
    dispatch => {
        dispatch(putProjectInit());
        request.put(`/api/project/${ project.id}`)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putProjectSuccess(r));
                }

                if(!res.ok)
                    dispatch(putProjectError({...fields, id: project.id }, res.body))
            });
    };

/** RESET */
export const resetProject = (project, form_mode) => {
    return {
        type: RESET_PROJECT,
        form_mode,
        project
    }
}
