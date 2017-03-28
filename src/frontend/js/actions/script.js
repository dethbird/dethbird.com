import request from 'superagent';
import { browserHistory } from 'react-router';
import { SCRIPT, SCRIPTS } from 'constants/actions';


const scriptsRequestInit = () => {
    return {
        type: SCRIPTS.REQUEST
    }
}

const scriptsRequestSuccess = (models) => {
    return {
        type: SCRIPTS.SUCCESS,
        models
    }
}

const scriptsRequestError = (errors) => {
    return {
        type: SCRIPTS.ERROR,
        errors
    }
}


export const scriptsGet = (id) =>
    dispatch => {
        dispatch(scriptsRequestInit());
        request.get(`/api/0.1/scripts`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(scriptsRequestSuccess(res.body));
                } else {
                    dispatch(scriptsRequestError(res.body));
                }
        });
    };

const scriptRequestInit = () => {
    return {
        type: SCRIPT.REQUEST
    }
}

const scriptRequestSuccess = (model) => {
    return {
        type: SCRIPT.SUCCESS,
        model
    }
}

const scriptRequestError = (errors) => {
    return {
        type: SCRIPT.ERROR,
        errors
    }
}


export const scriptGet = (id) =>
    dispatch => {
        dispatch(scriptRequestInit());
        request.get(`/api/0.1/script/${id}`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(scriptRequestSuccess(res.body));
                } else {
                    dispatch(scriptRequestError(res.body));
                }
        });
    };


export const scriptPut = (id, fields) =>
    dispatch => {
        dispatch(scriptRequestInit());
        request.put(`/api/0.1/script/${id}`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(scriptRequestSuccess(res.body));
                } else {
                    dispatch(scriptRequestError(res.body));
                }
        });
    };

export const scriptPost = (fields) =>
    dispatch => {
        dispatch(scriptRequestInit());
        request.post(`/api/0.1/script`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(scriptRequestSuccess(res.body));
                    browserHistory.replace(`/script/${res.body.id}/edit`);
                } else {
                    dispatch(scriptRequestError(res.body));
                }
        });
    };
