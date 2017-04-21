import request from 'superagent';
import { browserHistory } from 'react-router';
import { NEWSFEED } from 'constants/actions';


const newsfeedRequestInit = () => {
    return {
        type: NEWSFEED.REQUEST
    }
}

const newsfeedRequestSuccess = (models) => {
    return {
        type: NEWSFEED.SUCCESS,
        models
    }
}

const newsfeedRequestError = (errors) => {
    return {
        type: NEWSFEED.ERROR,
        errors
    }
}

export const newsfeedGet = () =>
    dispatch => {

        dispatch(newsfeedRequestInit());
        request.get(`/api/0.1/homepage/news`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(newsfeedRequestSuccess(res.body));
                } else {
                    dispatch(newsfeedRequestError(res.body));
                }
        });
    };
