import request from 'superagent';
import { browserHistory } from 'react-router';
import { PROJECT, PROJECTS } from 'constants/actions';


const projectsRequestInit = () => {
    return {
        type: PROJECTS.REQUEST
    }
}

const projectsRequestSuccess = (models) => {
    return {
        type: PROJECTS.SUCCESS,
        models
    }
}

const projectsRequestError = (errors) => {
    return {
        type: PROJECTS.ERROR,
        errors
    }
}

export const projectsGet = () =>
    dispatch => {
        dispatch(projectsRequestInit());
        request.get(`/api/0.1/projects`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(projectsRequestSuccess(res.body));
                } else {
                    dispatch(projectsRequestError(res.body));
                }
        });
    };

const projectRequestInit = () => {
    return {
        type: PROJECT.REQUEST
    }
}

const projectRequestSuccess = (model) => {
    return {
        type: PROJECT.SUCCESS,
        model
    }
}

const projectRequestError = (errors) => {
    return {
        type: PROJECT.ERROR,
        errors
    }
}


export const projectGet = (id) =>
    dispatch => {
        dispatch(projectRequestInit());
        request.get(`/api/0.1/project/${id}`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(projectRequestSuccess(res.body));
                } else {
                    dispatch(projectRequestError(res.body));
                }
        });
    };


export const projectPut = (id, fields) =>
    dispatch => {
        dispatch(projectRequestInit());
        request.put(`/api/0.1/project/${id}`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(projectRequestSuccess(res.body));
                } else {
                    dispatch(projectRequestError(res.body));
                }
        });
    };

export const projectPost = (fields) =>
    dispatch => {
        dispatch(projectRequestInit());
        request.post(`/api/0.1/project`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(projectRequestSuccess(res.body));
                    browserHistory.replace(`/project/${res.body.id}/edit`);
                } else {
                    dispatch(projectRequestError(res.body));
                }
        });
    };

export const projectReset = () => {
    return {
        type: PROJECT.RESET,
        model: null
    }
}
