import {
    GET_CONTENT_ARTICLES_REQUEST,
    GET_CONTENT_ARTICLES_ERROR,
    GET_CONTENT_ARTICLES_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
} from '../constants/ui-state';


const contentArticles = (state = {}, action) => {

    switch (action.type) {
        case GET_CONTENT_ARTICLES_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_CONTENT_ARTICLES_ERROR:
            return {
                ui_state: UI_STATE_ERROR
            }
        case GET_CONTENT_ARTICLES_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                articles: action.articles
            }
        default:
            return state;
    }
}

export default contentArticles;
