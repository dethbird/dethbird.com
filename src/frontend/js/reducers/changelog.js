import { CHANGELOG } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const changelogReducer = (state = {}, action) => {

    switch (action.type) {
        case CHANGELOG.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case CHANGELOG.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case CHANGELOG.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default changelogReducer;
