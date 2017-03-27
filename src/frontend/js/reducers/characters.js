import { CHARACTERS } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const charactersReducer = (state = {}, action) => {

    switch (action.type) {
        case CHARACTERS.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case CHARACTERS.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case CHARACTERS.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default charactersReducer;
