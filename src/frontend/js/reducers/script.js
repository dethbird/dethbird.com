import {
    GET_SCRIPT_REQUEST,
    GET_SCRIPT_ERROR,
    GET_SCRIPT_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
} from '../constants/ui-state';


const script = (state = {}, action) => {

    switch (action.type) {
        case GET_SCRIPT_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_SCRIPT_ERROR:
            return {
                ui_state: UI_STATE_ERROR
            }
        case GET_SCRIPT_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                script: action.script
            }
        default:
            return state;
    }
}

export default script;
