import request from 'superagent';

import { POCKET } from 'constants/actions';

const getAllArticlesInit = () => {
    return {
        type: POCKET.REQUEST
    }
}

const getAllArticlesSuccess = (data) => {
    return {
        type: POCKET.SUCCESS,
        data: data
    }
}

const getAllArticlesError = () => {
    return {
        type: POCKET.ERROR
    }
}

export const getAllArticles = () =>
    dispatch => {
        dispatch(getAllArticlesInit());
        request.get('/proxy/api/0.1/service/pocket/items')
            .then((res) => dispatch(getAllArticlesSuccess(res.body)))
            .catch(() => dispatch(getAllArticlesError()));
    };
