import { NEWSFEED } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const newsfeedReducer = (state = {}, action) => {

    switch (action.type) {
        case NEWSFEED.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case NEWSFEED.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case NEWSFEED.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default newsfeedReducer;
