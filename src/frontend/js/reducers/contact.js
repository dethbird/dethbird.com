import { CONTACT } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const contactReducer = (state = {}, action) => {

    switch (action.type) {
        case CONTACT.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case CONTACT.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case CONTACT.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        case CONTACT.RESET:
            return {
                ui_state: UI_STATE.INITIALIZING,
                errors: null
            }
        default:
            return state;
    }
}

export default contactReducer;
