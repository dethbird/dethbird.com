import { POCKET } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const pocketReducer = (state = {}, action) => {

    switch (action.type) {
        case POCKET.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case POCKET.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case POCKET.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                data: action.data
            }
        default:
            return state;
    }
}

export default pocketReducer;
