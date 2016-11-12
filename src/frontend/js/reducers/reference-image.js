import {
    GET_REFERENCE_IMAGE_REQUEST,
    GET_REFERENCE_IMAGE_ERROR,
    GET_REFERENCE_IMAGE_SUCCESS,
    POST_REFERENCE_IMAGE_REQUEST,
    POST_REFERENCE_IMAGE_ERROR,
    POST_REFERENCE_IMAGE_SUCCESS,
    PUT_REFERENCE_IMAGE_REQUEST,
    PUT_REFERENCE_IMAGE_ERROR,
    PUT_REFERENCE_IMAGE_SUCCESS,
    RESET_REFERENCE_IMAGE,
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


const referenceImage = (state = {}, action) => {

    switch (action.type) {
        case GET_REFERENCE_IMAGE_REQUEST:
        case POST_REFERENCE_IMAGE_REQUEST:
        case PUT_REFERENCE_IMAGE_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_REFERENCE_IMAGE_ERROR:
        case POST_REFERENCE_IMAGE_ERROR:
        case PUT_REFERENCE_IMAGE_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                reference_image: action.reference_image ? action.reference_image : {}
            }
        case GET_REFERENCE_IMAGE_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                reference_image: action.reference_image,
            }
        case POST_REFERENCE_IMAGE_SUCCESS:
        case PUT_REFERENCE_IMAGE_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                reference_image: action.reference_image
            }
        case RESET_REFERENCE_IMAGE:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                reference_image: action.reference_image,            }
        default:
            return state;
    }
}

export default referenceImage;
