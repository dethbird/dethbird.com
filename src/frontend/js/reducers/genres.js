import { GENRES } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const genresReducer = (state = {}, action) => {

    switch (action.type) {
        case GENRES.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case GENRES.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case GENRES.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default genresReducer;
