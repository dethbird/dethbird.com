import {
    GET_STORYBOARD_PANEL_REVISION_REQUEST,
    GET_STORYBOARD_PANEL_REVISION_ERROR,
    GET_STORYBOARD_PANEL_REVISION_SUCCESS,
    POST_STORYBOARD_PANEL_REVISION_REQUEST,
    POST_STORYBOARD_PANEL_REVISION_ERROR,
    POST_STORYBOARD_PANEL_REVISION_SUCCESS,
    PUT_STORYBOARD_PANEL_REVISION_REQUEST,
    PUT_STORYBOARD_PANEL_REVISION_ERROR,
    PUT_STORYBOARD_PANEL_REVISION_SUCCESS,
    RESET_STORYBOARD_PANEL_REVISION,
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


const storyboardPanelRevision = (state = {}, action) => {
    switch (action.type) {
        case GET_STORYBOARD_PANEL_REVISION_REQUEST:
        case POST_STORYBOARD_PANEL_REVISION_REQUEST:
        case PUT_STORYBOARD_PANEL_REVISION_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_STORYBOARD_PANEL_REVISION_ERROR:
        case POST_STORYBOARD_PANEL_REVISION_ERROR:
        case PUT_STORYBOARD_PANEL_REVISION_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
                revision: action.revision ? action.revision : {}
            }
        case GET_STORYBOARD_PANEL_REVISION_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
                revision: action.revision
            }
        case POST_STORYBOARD_PANEL_REVISION_SUCCESS:
        case PUT_STORYBOARD_PANEL_REVISION_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
                revision: action.revision
            }
        case RESET_STORYBOARD_PANEL_REVISION:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
                revision: action.revision
            }
        default:
            return state;
    }
}

export default storyboardPanelRevision;
