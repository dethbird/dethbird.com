import {
    GET_CHARACTER_REQUEST,
    GET_CHARACTER_ERROR,
    GET_CHARACTER_SUCCESS,
    POST_CHARACTER_REQUEST,
    POST_CHARACTER_ERROR,
    POST_CHARACTER_SUCCESS,
    PUT_CHARACTER_REQUEST,
    PUT_CHARACTER_ERROR,
    PUT_CHARACTER_SUCCESS,
    REORDER_CHARACTER_REVISIONS_REQUEST,
    REORDER_CHARACTER_REVISIONS_ERROR,
    REORDER_CHARACTER_REVISIONS_SUCCESS,
    RESET_CHARACTER,
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


const character = (state = {}, action) => {

    switch (action.type) {
        case GET_CHARACTER_REQUEST:
        case POST_CHARACTER_REQUEST:
        case PUT_CHARACTER_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case REORDER_CHARACTER_REVISIONS_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING,
                form_mode: action.form_mode,
                project: action.project,
                character: action.character,
            }
        case GET_CHARACTER_ERROR:
        case POST_CHARACTER_ERROR:
        case PUT_CHARACTER_ERROR:
        case PUT_CHARACTER_ERROR:
        case REORDER_CHARACTER_REVISIONS_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                character: action.character ? action.character : {}
            }
        case GET_CHARACTER_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                character: action.character,
            }
        case POST_CHARACTER_SUCCESS:
        case PUT_CHARACTER_SUCCESS:
        case REORDER_CHARACTER_REVISIONS_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                character: action.character
            }
        case RESET_CHARACTER:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                character: action.character,
            }
        default:
            return state;
    }
}

export default character;
