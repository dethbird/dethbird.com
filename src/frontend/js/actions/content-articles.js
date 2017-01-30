import request from 'superagent';
import {
    GET_CONTENT_ARTICLES_REQUEST,
    GET_CONTENT_ARTICLES_ERROR,
    GET_CONTENT_ARTICLES_SUCCESS,
} from '../constants/actions';

const getContentArticlesInit = () => {
    return {
        type: GET_CONTENT_ARTICLES_REQUEST
    }
}

const getContentArticlesSuccess = (articles) => {
    return {
        type: GET_CONTENT_ARTICLES_SUCCESS,
        articles: articles
    }
}

const getContentArticlesError = () => {
    return {
        type: GET_CONTENT_ARTICLES_ERROR
    }
}

export const getContentArticles = () =>
    dispatch => {
        dispatch(getContentArticlesInit());
        request.get('/api/content/articles').set('X-Api-Key', applicationApiKey)
            .end(function(err, res){
                dispatch(getContentArticlesSuccess(res.body));
            });
    };
