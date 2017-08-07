import { PROJECT_STORYBOARD } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const projectStoryboardReducer = (state = {}, action) => {
    
    switch (action.type) {
        case PROJECT_STORYBOARD.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case PROJECT_STORYBOARD.ERROR:
            return {
                ui_state: UI_STATE.ERROR
            }
        case PROJECT_STORYBOARD.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                project: action.project,
                storyboard: action.storyboard
            }
        default:
            return state;
    }
}

export default projectStoryboardReducer;
