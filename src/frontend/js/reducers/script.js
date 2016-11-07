import {
    GET_SCRIPT_REQUEST,
    GET_SCRIPT_ERROR,
    GET_SCRIPT_SUCCESS,
    POST_SCRIPT_REQUEST,
    POST_SCRIPT_ERROR,
    POST_SCRIPT_SUCCESS,
    PUT_SCRIPT_REQUEST,
    PUT_SCRIPT_ERROR,
    PUT_SCRIPT_SUCCESS,
    RESET_SCRIPT,
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


const script = (state = {}, action) => {

    switch (action.type) {
        case GET_SCRIPT_REQUEST:
        case POST_SCRIPT_REQUEST:
        case PUT_SCRIPT_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_SCRIPT_ERROR:
            return {
                ui_state: UI_STATE_COMPLETE
            }
        case POST_SCRIPT_ERROR:
        case PUT_SCRIPT_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                script: action.script ? action.script : {},
            }
        case GET_SCRIPT_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                script: action.script
            }
        case POST_SCRIPT_SUCCESS:
        case PUT_SCRIPT_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                script: action.script
            }
        case RESET_SCRIPT:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                script: action.script
            }
        default:
            return state;
    }
}

export default script;
