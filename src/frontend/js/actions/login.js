import request from 'superagent';
import { browserHistory } from 'react-router';
import { LOGIN_ATTEMPT } from 'constants/actions';

/** POST */
const loginAttemptInit = () => {
    return {
        type: LOGIN_ATTEMPT.REQUEST
    }
}

const loginAttemptSuccess = () => {
    return {
        type: LOGIN_ATTEMPT.SUCCESS
    }
}

const loginAttemptError = (errors) => {
    return {
        type: LOGIN_ATTEMPT.ERROR,
        errors
    }
}

export const loginAttempt = (fields) =>
    dispatch => {
        dispatch(loginAttemptInit());
        request.post('/api/0.1/login')
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(loginAttemptSuccess());
                    securityContext = res.body;
                    browserHistory.push('/dashboard');
                } else {
                    dispatch(loginAttemptError(res.body));
                }
        });
    };
