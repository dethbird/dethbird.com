import {
    GET_FLICKRS_REQUEST,
    GET_FLICKRS_ERROR,
    GET_FLICKRS_SUCCESS,
} from '../constants/actions';
import {
    FLICKR_SELECTOR_STATE_REQUESTING,
    FLICKR_SELECTOR_STATE_ERROR,
    FLICKR_SELECTOR_STATE_COMPLETE,
} from '../constants/ui-state';


const flickrSelector = (state = {}, action) => {
    switch (action.type) {
        case GET_FLICKRS_REQUEST:
            return {
                flickr_selector_state: FLICKR_SELECTOR_STATE_REQUESTING
            }
        case GET_FLICKRS_ERROR:
            return {
                flickr_selector_state: FLICKR_SELECTOR_STATE_ERROR
            }
        case GET_FLICKRS_SUCCESS:
            return {
                flickr_selector_state: FLICKR_SELECTOR_STATE_COMPLETE,
                flickrs: action.flickrs
            }
        default:
            return state;
    }
}

export default flickrSelector;
