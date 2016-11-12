import {
    GET_CONCEPT_ART_REQUEST,
    GET_CONCEPT_ART_ERROR,
    GET_CONCEPT_ART_SUCCESS,
    POST_CONCEPT_ART_REQUEST,
    POST_CONCEPT_ART_ERROR,
    POST_CONCEPT_ART_SUCCESS,
    PUT_CONCEPT_ART_REQUEST,
    PUT_CONCEPT_ART_ERROR,
    PUT_CONCEPT_ART_SUCCESS,
    REORDER_CONCEPT_ART_REVISIONS_REQUEST,
    REORDER_CONCEPT_ART_REVISIONS_ERROR,
    REORDER_CONCEPT_ART_REVISIONS_SUCCESS,
    RESET_CONCEPT_ART,
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


const conceptArt = (state = {}, action) => {

    switch (action.type) {
        case GET_CONCEPT_ART_REQUEST:
        case POST_CONCEPT_ART_REQUEST:
        case PUT_CONCEPT_ART_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case REORDER_CONCEPT_ART_REVISIONS_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING,
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art,
            }
        case GET_CONCEPT_ART_ERROR:
        case POST_CONCEPT_ART_ERROR:
        case PUT_CONCEPT_ART_ERROR:
        case PUT_CONCEPT_ART_ERROR:
        case REORDER_CONCEPT_ART_REVISIONS_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art ? action.concept_art : {}
            }
        case GET_CONCEPT_ART_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art,
            }
        case POST_CONCEPT_ART_SUCCESS:
        case PUT_CONCEPT_ART_SUCCESS:
        case REORDER_CONCEPT_ART_REVISIONS_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art
            }
        case RESET_CONCEPT_ART:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art,
            }
        default:
            return state;
    }
}

export default conceptArt;
