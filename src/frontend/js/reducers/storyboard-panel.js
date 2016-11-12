import {
    GET_STORYBOARD_PANEL_REQUEST,
    GET_STORYBOARD_PANEL_ERROR,
    GET_STORYBOARD_PANEL_SUCCESS,
    POST_STORYBOARD_PANEL_REQUEST,
    POST_STORYBOARD_PANEL_ERROR,
    POST_STORYBOARD_PANEL_SUCCESS,
    PUT_STORYBOARD_PANEL_REQUEST,
    PUT_STORYBOARD_PANEL_ERROR,
    PUT_STORYBOARD_PANEL_SUCCESS,
    REORDER_STORYBOARD_PANEL_REVISIONS_REQUEST,
    REORDER_STORYBOARD_PANEL_REVISIONS_ERROR,
    REORDER_STORYBOARD_PANEL_REVISIONS_SUCCESS,
    RESET_STORYBOARD_PANEL,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
    UI_STATE_SUCCESS,
} from '../constants/ui-state';
import {
    FORM_MODE_EDIT
} from '../constants/form';


const storyboardPanel = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
        case GET_STORYBOARD_PANEL_REQUEST:
        case POST_STORYBOARD_PANEL_REQUEST:
        case PUT_STORYBOARD_PANEL_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case REORDER_STORYBOARD_PANEL_REVISIONS_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
            }
        case GET_STORYBOARD_PANEL_ERROR:
        case POST_STORYBOARD_PANEL_ERROR:
        case PUT_STORYBOARD_PANEL_ERROR:
        case PUT_STORYBOARD_PANEL_ERROR:
        case REORDER_STORYBOARD_PANEL_REVISIONS_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel ? action.panel : {}
            }
        case GET_STORYBOARD_PANEL_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
            }
        case POST_STORYBOARD_PANEL_SUCCESS:
        case PUT_STORYBOARD_PANEL_SUCCESS:
        case REORDER_STORYBOARD_PANEL_REVISIONS_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel
            }
        case RESET_STORYBOARD_PANEL:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
            }
        default:
            return state;
    }
}

export default storyboardPanel;
