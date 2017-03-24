import { LOGIN_ATTEMPT } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const loginReducer = (state = {}, action) => {

    switch (action.type) {
        case LOGIN_ATTEMPT.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case LOGIN_ATTEMPT.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case LOGIN_ATTEMPT.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS
            }
        default:
            return state;
    }
}

export default loginReducer;
