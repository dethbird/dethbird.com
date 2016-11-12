import {
    GET_CONCEPT_ART_REVISION_REQUEST,
    GET_CONCEPT_ART_REVISION_ERROR,
    GET_CONCEPT_ART_REVISION_SUCCESS,
    POST_CONCEPT_ART_REVISION_REQUEST,
    POST_CONCEPT_ART_REVISION_ERROR,
    POST_CONCEPT_ART_REVISION_SUCCESS,
    PUT_CONCEPT_ART_REVISION_REQUEST,
    PUT_CONCEPT_ART_REVISION_ERROR,
    PUT_CONCEPT_ART_REVISION_SUCCESS,
    RESET_CONCEPT_ART_REVISION,
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


const conceptArtRevision = (state = {}, action) => {

    switch (action.type) {
        case GET_CONCEPT_ART_REVISION_REQUEST:
        case POST_CONCEPT_ART_REVISION_REQUEST:
        case PUT_CONCEPT_ART_REVISION_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_CONCEPT_ART_REVISION_ERROR:
        case POST_CONCEPT_ART_REVISION_ERROR:
        case PUT_CONCEPT_ART_REVISION_ERROR:
        case PUT_CONCEPT_ART_REVISION_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art,
                revision: action.revision ? action.revision : {}
            }
        case GET_CONCEPT_ART_REVISION_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art,
                revision: action.revision,
            }
        case POST_CONCEPT_ART_REVISION_SUCCESS:
        case PUT_CONCEPT_ART_REVISION_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art,
                revision: action.revision
            }
        case RESET_CONCEPT_ART_REVISION:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                concept_art: action.concept_art,
                revision: action.revision
            }
        default:
            return state;
    }
}

export default conceptArtRevision;
