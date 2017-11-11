import { SET_XYCANVAS_PARAM } from 'constants/actions';

const initialState = {
    scale: 1,
};

const xycanvasReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_XYCANVAS_PARAM:
            return {
                ... action.params
            }
        default:
            return state;
    }
}

export default xycanvasReducer;
