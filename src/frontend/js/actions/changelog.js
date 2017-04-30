import request from 'superagent';
import { browserHistory } from 'react-router';
import { CHANGELOG } from 'constants/actions';


const changelogRequestInit = () => {
    return {
        type: CHANGELOG.REQUEST
    }
}

const changelogRequestSuccess = (models) => {
    return {
        type: CHANGELOG.SUCCESS,
        models
    }
}

const changelogRequestError = (errors) => {
    return {
        type: CHANGELOG.ERROR,
        errors
    }
}

export const changelogGet = () =>
    dispatch => {
        dispatch(changelogRequestInit());
        request.get(`/api/0.1/changelog`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(changelogRequestSuccess(res.body));
                } else {
                    dispatch(changelogRequestError(res.body));
                }
        });
    };
