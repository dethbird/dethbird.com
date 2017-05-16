import { USER } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case USER.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case USER.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case USER.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        case USER.RESET:
            return {
                ui_state: UI_STATE.INITIALIZING,
                model: action.model
            }
        default:
            return state;
    }
}

export default userReducer;
