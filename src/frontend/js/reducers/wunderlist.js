import { WUNDERLIST } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const wunderlistReducer = (state = {}, action) => {

    switch (action.type) {
        case WUNDERLIST.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case WUNDERLIST.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case WUNDERLIST.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                data: action.data
            }
        default:
            return state;
    }
}

export default wunderlistReducer;
