import {
    GET_SCRIPTS_REQUEST,
    GET_SCRIPTS_ERROR,
    GET_SCRIPTS_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
} from '../constants/ui-state';


const scripts = (state = {}, action) => {

    switch (action.type) {
        case GET_SCRIPTS_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_SCRIPTS_ERROR:
            return {
                ui_state: UI_STATE_ERROR
            }
        case GET_SCRIPTS_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                scripts: action.scripts
            }
        default:
            return state;
    }
}

export default scripts;
