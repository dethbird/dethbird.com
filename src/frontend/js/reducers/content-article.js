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
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
    UI_STATE_SUCCESS,
} from '../constants/ui-state';
import {
    FORM_MODE_EDIT
} from '../constants/form';


const contentArticle = (state = {}, action) => {

    switch (action.type) {
        case GET_CONTENT_ARTICLE_REQUEST:
        case POST_CONTENT_ARTICLE_REQUEST:
        case PUT_CONTENT_ARTICLE_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_CONTENT_ARTICLE_ERROR:
        case POST_CONTENT_ARTICLE_ERROR:
        case PUT_CONTENT_ARTICLE_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                article: action.article ? action.article : {}
            }
        case GET_CONTENT_ARTICLE_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                article: action.article,
            }
        case POST_CONTENT_ARTICLE_SUCCESS:
        case PUT_CONTENT_ARTICLE_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                article: action.article
            }
        case RESET_CONTENT_ARTICLE:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                article: action.article,
            }
        default:
            return state;
    }
}

export default contentArticle;
