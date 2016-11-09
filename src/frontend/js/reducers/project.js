import {
    GET_PROJECT_REQUEST,
    GET_PROJECT_ERROR,
    GET_PROJECT_SUCCESS,
    POST_PROJECT_REQUEST,
    POST_PROJECT_ERROR,
    POST_PROJECT_SUCCESS,
    PUT_PROJECT_REQUEST,
    PUT_PROJECT_ERROR,
    PUT_PROJECT_SUCCESS,
    RESET_PROJECT,
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


const project = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
        case GET_PROJECT_REQUEST:
        case POST_PROJECT_REQUEST:
        case PUT_PROJECT_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_PROJECT_ERROR:
        case POST_PROJECT_ERROR:
        case PUT_PROJECT_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project ? action.project : {}
            }
        case GET_PROJECT_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project
            }
        case POST_PROJECT_SUCCESS:
        case PUT_PROJECT_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project
            }
        case RESET_PROJECT:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project
            }
        default:
            return state;
    }
}

export default project;
