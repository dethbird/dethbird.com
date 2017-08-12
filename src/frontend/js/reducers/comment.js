import { COMMENT } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const commentReducer = (state = {}, action) => {
    switch (action.type)
     {
        case COMMENT.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING,
                uuid: action.uuid
            }
        case COMMENT.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors,
                uuid: action.uuid
            }
        case COMMENT.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: action.model,
                uuid: action.uuid
            }
        default:
            return state;
    }
}

export default commentReducer;
