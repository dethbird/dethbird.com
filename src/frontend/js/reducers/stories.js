import { STORIES } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const storiesReducer = (state = {}, action) => {

    switch (action.type) {
        case STORIES.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case STORIES.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case STORIES.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default storiesReducer;
