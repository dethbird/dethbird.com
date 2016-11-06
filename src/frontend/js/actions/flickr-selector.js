import request from 'superagent';
import {
    GET_FLICKRS_REQUEST,
    GET_FLICKRS_ERROR,
    GET_FLICKRS_SUCCESS,
} from '../constants/actions';

const getFlickrsInit = () => {
    return {
        type: GET_FLICKRS_REQUEST
    }
}

const getFlickrsSuccess = (flickrs) => {
    return {
        type: GET_FLICKRS_SUCCESS,
        flickrs
    }
}

const getFlickrsError = () => {
    return {
        type: GET_FLICKRS_ERROR
    }
}

export const getFlickrs = () =>
    dispatch => {
        dispatch(getFlickrsInit());
        request.get('/api/external-content-source/flickr')
            .then((res) => dispatch(getFlickrsSuccess(res.body)))
            .catch((error) => {
                console.log(error);
                dispatch(getFlickrsError())
            });
    };
