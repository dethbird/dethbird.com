import request from 'superagent';
import { browserHistory } from 'react-router';
import { GENRES } from 'constants/actions';


const genresRequestInit = () => {
    return {
        type: GENRES.REQUEST
    }
}

const genresRequestSuccess = (models) => {
    return {
        type: GENRES.SUCCESS,
        models
    }
}

const genresRequestError = (errors) => {
    return {
        type: GENRES.ERROR,
        errors
    }
}

export const genresGet = () =>
    dispatch => {
        dispatch(genresRequestInit());
        request.get(`/api/0.1/genres`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(genresRequestSuccess(res.body));
                } else {
                    dispatch(genresRequestError(res.body));
                }
        });
    };
