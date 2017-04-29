import { PROJECTS } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const projectsReducer = (state = {}, action) => {

    switch (action.type) {
        case PROJECTS.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case PROJECTS.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case PROJECTS.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default projectsReducer;
