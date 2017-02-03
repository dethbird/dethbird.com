import request from 'superagent';
import {
    GET_CONTENT_ARTICLE_REQUEST,
    GET_CONTENT_ARTICLE_ERROR,
    GET_CONTENT_ARTICLE_SUCCESS,
    POST_CONTENT_ARTICLE_REQUEST,
    POST_CONTENT_ARTICLE_ERROR,
    POST_CONTENT_ARTICLE_SUCCESS,
    PUT_CONTENT_ARTICLE_REQUEST,
    PUT_CONTENT_ARTICLE_ERROR,
    PUT_CONTENT_ARTICLE_SUCCESS,
    RESET_CONTENT_ARTICLE,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getContentArticleInit = () => {
    return {
        type: GET_CONTENT_ARTICLE_REQUEST
    }
}

const getContentArticleSuccess = (project, script, form_mode) => {
    return {
        type: GET_CONTENT_ARTICLE_SUCCESS,
        form_mode,
        project,
        script
    }
}

const getContentArticleError = () => {
    return {
        type: GET_CONTENT_ARTICLE_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getContentArticle = (projectId, scriptId) =>
    dispatch => {
        dispatch(getContentArticleInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const script = _.findWhere(project.scripts, {
                    'id': parseInt(scriptId)
                });
                const form_mode = script ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getContentArticleSuccess(project, script, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getContentArticleError())
            });
    };

/** POST */
const postContentArticleInit = ( article ) => {
    return {
        type: POST_CONTENT_ARTICLE_REQUEST,
        form_mode: FORM_MODE_ADD,
        article
    }
}

const postContentArticleSuccess = (article) => {
    return {
        type: POST_CONTENT_ARTICLE_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        article
    }
}

const postContentArticleError = (article, errors) => {
    return {
        type: POST_CONTENT_ARTICLE_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        article
    }
}

export const postContentArticle = (fields) =>
    dispatch => {
        dispatch(postContentArticleInit());
        request.post('/api/content/article')
            .send( { url: fields.url } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(postContentArticleSuccess({... res.body, xApiKey: fields.xApiKey }));
                } else {
                    dispatch(postContentArticleError(fields, res.body))
                }
        });
    };

 /** PUT */
const putContentArticleInit = ( article ) => {
    return {
        type: PUT_CONTENT_ARTICLE_REQUEST,
        form_mode: FORM_MODE_EDIT,
        article
    }
}

const putContentArticleSuccess = ( article ) => {
    return {
        type: PUT_CONTENT_ARTICLE_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        article
    }
}

const putContentArticleError = (article, errors) => {
    return {
        type: PUT_CONTENT_ARTICLE_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        article
    }
}

export const putContentArticle = (article, fields) =>
    dispatch => {
        dispatch(putContentArticleInit());
        request.put('/api/content/article/' + article.id)
            .send( { notes: fields.notes } )
            .end((err, res) => {
                if(res.ok) {
                    dispatch(putContentArticleSuccess(res.body));
                }

                if(!res.ok)
                    dispatch(putContentArticleError( { ...article, ...fields }, res.body))
            });
    };

/** RESET */
export const resetContentArticle = (article, form_mode) => {
    return {
        type: RESET_CONTENT_ARTICLE,
        form_mode,
        article
    }
}
