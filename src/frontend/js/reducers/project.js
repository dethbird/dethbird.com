import {
    GET_PROJECT_REQUEST,
    GET_PROJECT_ERROR,
    GET_PROJECT_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
} from '../constants/ui-state';


const project = (state = {}, action) => {

    switch (action.type) {
        case GET_PROJECT_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_PROJECT_ERROR:
            return {
                ui_state: UI_STATE_ERROR
            }
        case GET_PROJECT_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                project: action.project
            }
        default:
            return state;
    }
}

export default project;
