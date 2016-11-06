import {
    GET_STORYBOARD_PANEL_REVISION_REQUEST,
    GET_STORYBOARD_PANEL_REVISION_ERROR,
    GET_STORYBOARD_PANEL_REVISION_SUCCESS,
} from '../constants/actions';
import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_COMPLETE,
} from '../constants/ui-state';


const storyboardPanelRevision = (state = {}, action) => {
    switch (action.type) {
        case GET_STORYBOARD_PANEL_REVISION_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_STORYBOARD_PANEL_REVISION_ERROR:
            return {
                ui_state: UI_STATE_ERROR
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
        case GET_STORYBOARD_PANEL_REVISION_SUCCESS:
            return {
                changedFields: action.changedFields
            }
        default:
            return state;
    }
}

export default storyboardPanelRevision;
