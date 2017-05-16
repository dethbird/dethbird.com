import request from 'superagent';
import { browserHistory } from 'react-router';
import { USERS } from 'constants/actions';


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
