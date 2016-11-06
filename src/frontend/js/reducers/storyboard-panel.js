import {
    GET_STORYBOARD_PANEL_REQUEST,
    GET_STORYBOARD_PANEL_ERROR,
    GET_STORYBOARD_PANEL_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
} from '../constants/ui-state';


const storyboardPanel = (state = {}, action) => {

    switch (action.type) {
        case GET_STORYBOARD_PANEL_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_STORYBOARD_PANEL_ERROR:
            return {
                ui_state: UI_STATE_ERROR
            }
        case GET_STORYBOARD_PANEL_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel
            }
        default:
            return state;
    }
}

export default storyboardPanel;
