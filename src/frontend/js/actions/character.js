import request from 'superagent';
import { browserHistory } from 'react-router';
import { CHARACTER } from 'constants/actions';

// GET
const characterGetInit = () => {
    return {
        type: CHARACTER.REQUEST
    }
}

const characterGetSuccess = (model) => {
    return {
        type: CHARACTER.SUCCESS,
        model
    }
}

const characterGetError = (errors) => {
    return {
        type: CHARACTER.ERROR,
        errors
    }
}

export const characterGet = (id) =>
    dispatch => {
        dispatch(characterGetInit());
        request.get(`/api/0.1/character/${id}`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(characterGetSuccess(res.body));
                } else {
                    dispatch(loginAttemptError(res.body));
                }
        });
    };
