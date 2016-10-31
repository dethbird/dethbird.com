import request from 'superagent';
import {
    LOGIN_ATTEMPT,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
} from '../constants/actions';

const loginAttemptInit = () => {
    return {
        type: LOGIN_ATTEMPT
    }
}

const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user: user
    }
}

const loginError = () => {
    return {
        type: LOGIN_ERROR
    }
}

export const loginAttempt = (username, password) =>
    dispatch => {
        dispatch(loginAttemptInit());
        request.post('/api/login')
            .type('form')
            .send({username, password})
            .then((res) => dispatch(loginSuccess(res.body)))
            .catch(() => dispatch(loginError()));
    };
