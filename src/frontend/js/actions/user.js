import request from 'superagent';
import { browserHistory } from 'react-router';
import { USER, USERS } from 'constants/actions';


const usersRequestInit = () => {
    return {
        type: USERS.REQUEST
    }
}

const usersRequestSuccess = (models) => {
    return {
        type: USERS.SUCCESS,
        models
    }
}

const usersRequestError = (errors) => {
    return {
        type: USERS.ERROR,
        errors
    }
}

export const usersGet = (filter) =>
    dispatch => {
        dispatch(usersRequestInit());
        request.get(`/api/0.1/users`)
            .query(filter ? filter : {})
            .end(function(err, res){
                if(res.ok) {
                    dispatch(usersRequestSuccess(res.body));
                } else {
                    dispatch(usersRequestError(res.body));
                }
        });
    };

const userRequestInit = () => {
    return {
        type: USER.REQUEST
    }
}

const userRequestSuccess = (model) => {
    return {
        type: USER.SUCCESS,
        model
    }
}

const userRequestError = (errors) => {
    return {
        type: USER.ERROR,
        errors
    }
}


export const userGet = (id) =>
    dispatch => {
        dispatch(userRequestInit());
        request.get(`/api/0.1/user/${id}`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(userRequestSuccess(res.body));
                } else {
                    dispatch(userRequestError(res.body));
                }
        });
    };


export const userPut = (id, fields) =>
    dispatch => {
        dispatch(userRequestInit());
        request.put(`/api/0.1/user/${id}`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(userRequestSuccess(res.body));
                } else {
                    dispatch(userRequestError(res.body));
                }
        });
    };

export const userPost = (fields) =>
    dispatch => {
        dispatch(userRequestInit());
        request.post(`/api/0.1/user`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(userRequestSuccess(res.body));
                    browserHistory.replace(`/user/${res.body.id}/edit`);
                } else {
                    dispatch(userRequestError(res.body));
                }
        });
    };
