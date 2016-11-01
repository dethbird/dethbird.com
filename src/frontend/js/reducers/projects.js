import {
    GET_PROJECTS_REQUEST,
    GET_PROJECTS_ERROR,
    GET_PROJECTS_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_SUCCESS,
} from '../constants/ui-state';


const projects = (state = {}, action) => {

    switch (action.type) {
        case GET_PROJECTS_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_PROJECTS_ERROR:
            return {
                ui_state: UI_STATE_ERROR
            }
        case GET_PROJECTS_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                projects: action.projects
            }
        default:
            return {};
    }
}

export default projects;
