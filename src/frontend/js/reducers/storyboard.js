import {
    GET_STORYBOARD_REQUEST,
    GET_STORYBOARD_ERROR,
    GET_STORYBOARD_SUCCESS,
    POST_STORYBOARD_REQUEST,
    POST_STORYBOARD_ERROR,
    POST_STORYBOARD_SUCCESS,
    PUT_STORYBOARD_REQUEST,
    PUT_STORYBOARD_ERROR,
    PUT_STORYBOARD_SUCCESS,
    REORDER_STORYBOARD_PANELS_REQUEST,
    REORDER_STORYBOARD_PANELS_ERROR,
    REORDER_STORYBOARD_PANELS_SUCCESS,
    RESET_STORYBOARD,
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


const storyboard = (state = {}, action) => {

    switch (action.type) {
        case GET_STORYBOARD_REQUEST:
        case POST_STORYBOARD_REQUEST:
        case PUT_STORYBOARD_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case REORDER_STORYBOARD_PANELS_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard
            }
        case GET_STORYBOARD_ERROR:
        case POST_STORYBOARD_ERROR:
        case PUT_STORYBOARD_ERROR:
        case PUT_STORYBOARD_ERROR:
        case REORDER_STORYBOARD_PANELS_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                panel: action.storyboard ? action.storyboard : {}
            }
        case GET_STORYBOARD_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard
            }
        case POST_STORYBOARD_SUCCESS:
        case PUT_STORYBOARD_SUCCESS:
        case REORDER_STORYBOARD_PANELS_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard
            }
        case RESET_STORYBOARD:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard
            }
        default:
            return state;
    }
}

export default storyboard;
