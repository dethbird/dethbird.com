import { STORY } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const storyReducer = (state = {}, action) => {

    switch (action.type) {
        case STORY.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case STORY.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case STORY.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        default:
            return state;
    }
}

export default storyReducer;
