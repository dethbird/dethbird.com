import {
    GET_STORYBOARD_REQUEST,
    GET_STORYBOARD_ERROR,
    GET_STORYBOARD_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
} from '../constants/ui-state';


const storyboard = (state = {}, action) => {
    switch (action.type) {
        case GET_STORYBOARD_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_STORYBOARD_ERROR:
            return {
                ui_state: UI_STATE_ERROR
            }
        case GET_STORYBOARD_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                project: action.project,
                storyboard: action.storyboard
            }
        default:
            return state;
    }
}

export default storyboard;
