import { SCRIPT } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const scriptReducer = (state = {}, action) => {

    switch (action.type) {
        case SCRIPT.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case SCRIPT.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case SCRIPT.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        default:
            return state;
    }
}

export default scriptReducer;
