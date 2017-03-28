import { SCRIPTS } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const scriptsReducer = (state = {}, action) => {

    switch (action.type) {
        case SCRIPTS.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case SCRIPTS.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case SCRIPTS.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default scriptsReducer;
