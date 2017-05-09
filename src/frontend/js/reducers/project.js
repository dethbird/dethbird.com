import { PROJECT } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const projectReducer = (state = {}, action) => {

    switch (action.type) {
        case PROJECT.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case PROJECT.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case PROJECT.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        case PROJECT.RESET:
            return {
                ui_state: UI_STATE.INITIALIZING,
                model: action.model
            }
        default:
            return state;
    }
}

export default projectReducer;
