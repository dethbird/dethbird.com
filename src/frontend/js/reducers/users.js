import { USERS } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const usersReducer = (state = {}, action) => {

    switch (action.type) {
        case USERS.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case USERS.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case USERS.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default usersReducer;
