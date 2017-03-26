import { CHARACTER } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const characterReducer = (state = {}, action) => {

    switch (action.type) {
        case CHARACTER.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case CHARACTER.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case CHARACTER.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        default:
            return state;
    }
}

export default characterReducer;
