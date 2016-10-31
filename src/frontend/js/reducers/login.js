import {
    LOGIN_ATTEMPT,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_SUCCESS,
} from '../constants/ui-state';


const login = (state = {}, action) => {
    
    switch (action.type) {
        case LOGIN_ATTEMPT:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case LOGIN_ERROR:
            return {
                ui_state: UI_STATE_ERROR
            }
        case LOGIN_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS
            }
        default:
            return {};
    }
}

export default login;
