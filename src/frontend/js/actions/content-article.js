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
const postContentArticleInit = ( project, script ) => {
    return {
        type: POST_CONTENT_ARTICLE_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        script
    }
}

const postContentArticleSuccess = (project, script) => {
    return {
        type: POST_CONTENT_ARTICLE_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        script
    }
}

const postContentArticleError = (project, script, errors) => {
    return {
        type: POST_CONTENT_ARTICLE_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        script,
    }
}

export const postContentArticle = (project, fields) =>
    dispatch => {
        dispatch(postContentArticleInit());
        request.post('/api/project_script')
            .send( { ...fields, project_id: project.id } )
            .end((err, res) => {
                if(res.ok) {
                    const script = res.body;
                    dispatch(postContentArticleSuccess(project, script));
                }
                if(!res.ok)
                    dispatch(postContentArticleError(project, fields, res.body))
            });
    };

 /** PUT */
const putContentArticleInit = ( project, script ) => {
    return {
        type: PUT_CONTENT_ARTICLE_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        script
    }
}

const putContentArticleSuccess = (project, script) => {
    return {
        type: PUT_CONTENT_ARTICLE_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        script
    }
}

const putContentArticleError = (project, script, errors) => {
    return {
        type: PUT_CONTENT_ARTICLE_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        script
    }
}

export const putContentArticle = (project, script, fields) =>
    dispatch => {
        dispatch(putContentArticleInit());
        request.put('/api/project_script/' + script.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putContentArticleSuccess(r));
                }

                if(!res.ok)
                    dispatch(putContentArticleError(project, {...fields, id: script.id }, res.body))
            });
    };

/** RESET */
export const resetContentArticle = (project, script, form_mode) => {
    return {
        type: RESET_CONTENT_ARTICLE,
        form_mode,
        project,
        script
    }
}
