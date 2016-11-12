import {
    GET_LOCATION_REQUEST,
    GET_LOCATION_ERROR,
    GET_LOCATION_SUCCESS,
    POST_LOCATION_REQUEST,
    POST_LOCATION_ERROR,
    POST_LOCATION_SUCCESS,
    PUT_LOCATION_REQUEST,
    PUT_LOCATION_ERROR,
    PUT_LOCATION_SUCCESS,
    RESET_LOCATION,
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


const location = (state = {}, action) => {

    switch (action.type) {
        case GET_LOCATION_REQUEST:
        case POST_LOCATION_REQUEST:
        case PUT_LOCATION_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_LOCATION_ERROR:
        case POST_LOCATION_ERROR:
        case PUT_LOCATION_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                location: action.location ? action.location : {}
            }
        case GET_LOCATION_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                location: action.location,
            }
        case POST_LOCATION_SUCCESS:
        case PUT_LOCATION_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                location: action.location
            }
        case RESET_LOCATION:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                location: action.location,            }
        default:
            return state;
    }
}

export default location;
