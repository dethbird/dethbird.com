import {
    LOGIN_ATTEMPT,
    UI_STATE
} from 'constants/actions';


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
                ui_state: UI_STATE.COMPLETE
            }
        default:
            return state;
    }
}

export default loginReducer;
