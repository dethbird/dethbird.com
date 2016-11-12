import {
    GET_CHARACTER_REVISION_REQUEST,
    GET_CHARACTER_REVISION_ERROR,
    GET_CHARACTER_REVISION_SUCCESS,
    POST_CHARACTER_REVISION_REQUEST,
    POST_CHARACTER_REVISION_ERROR,
    POST_CHARACTER_REVISION_SUCCESS,
    PUT_CHARACTER_REVISION_REQUEST,
    PUT_CHARACTER_REVISION_ERROR,
    PUT_CHARACTER_REVISION_SUCCESS,
    RESET_CHARACTER_REVISION,
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


const characterRevision = (state = {}, action) => {

    switch (action.type) {
        case GET_CHARACTER_REVISION_REQUEST:
        case POST_CHARACTER_REVISION_REQUEST:
        case PUT_CHARACTER_REVISION_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_CHARACTER_REVISION_ERROR:
        case POST_CHARACTER_REVISION_ERROR:
        case PUT_CHARACTER_REVISION_ERROR:
        case PUT_CHARACTER_REVISION_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                character: action.character,
                revision: action.revision ? action.revision : {}
            }
        case GET_CHARACTER_REVISION_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                character: action.character,
                revision: action.revision,
            }
        case POST_CHARACTER_REVISION_SUCCESS:
        case PUT_CHARACTER_REVISION_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                character: action.character,
                revision: action.revision
            }
        case RESET_CHARACTER_REVISION:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                character: action.character,
                revision: action.revision
            }
        default:
            return state;
    }
}

export default characterRevision;
