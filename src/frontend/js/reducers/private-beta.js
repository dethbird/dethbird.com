import { PRIVATEBETA } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const privatebetaReducer = (state = {}, action) => {

    switch (action.type) {
        case PRIVATEBETA.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case PRIVATEBETA.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case PRIVATEBETA.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        default:
            return state;
    }
}

export default privatebetaReducer;
