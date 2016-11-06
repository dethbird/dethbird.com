import {
    GET_STORYBOARD_PANEL_COMMENT_REQUEST,
    GET_STORYBOARD_PANEL_COMMENT_ERROR,
    GET_STORYBOARD_PANEL_COMMENT_SUCCESS,
    POST_STORYBOARD_PANEL_COMMENT_REQUEST,
    POST_STORYBOARD_PANEL_COMMENT_ERROR,
    POST_STORYBOARD_PANEL_COMMENT_SUCCESS,
    PUT_STORYBOARD_PANEL_COMMENT_REQUEST,
    PUT_STORYBOARD_PANEL_COMMENT_ERROR,
    PUT_STORYBOARD_PANEL_COMMENT_SUCCESS,
    RESET_STORYBOARD_PANEL_COMMENT,
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


const storyboardPanelComment = (state = {}, action) => {

    switch (action.type) {
        case GET_STORYBOARD_PANEL_COMMENT_REQUEST:
        case POST_STORYBOARD_PANEL_COMMENT_REQUEST:
        case PUT_STORYBOARD_PANEL_COMMENT_REQUEST:
            return {
                ui_state: UI_STATE_REQUESTING
            }
        case GET_STORYBOARD_PANEL_COMMENT_ERROR:
        case POST_STORYBOARD_PANEL_COMMENT_ERROR:
        case PUT_STORYBOARD_PANEL_COMMENT_ERROR:
            return {
                ui_state: UI_STATE_ERROR,
                errors: action.errors ? action.errors : {},
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
                comment: action.comment ? action.comment : {},
            }
        case GET_STORYBOARD_PANEL_COMMENT_SUCCESS:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
                comment: action.comment
            }
        case POST_STORYBOARD_PANEL_COMMENT_SUCCESS:
        case PUT_STORYBOARD_PANEL_COMMENT_SUCCESS:
            return {
                ui_state: UI_STATE_SUCCESS,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
                comment: action.comment
            }
        case RESET_STORYBOARD_PANEL_COMMENT:
            return {
                ui_state: UI_STATE_COMPLETE,
                form_mode: action.form_mode,
                project: action.project,
                storyboard: action.storyboard,
                panel: action.panel,
                comment: action.comment
            }
        default:
            return state;
    }
}

export default storyboardPanelComment;
