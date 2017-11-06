import { THING } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const thingReducer = (state = {}, action) => {

    switch (action.type) {
        case THING.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case THING.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case THING.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                data: action.data
            }
        default:
            return state;
    }
}

export default thingReducer;
