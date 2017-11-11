import request from 'superagent';

import { SET_XYCANVAS_PARAM } from 'constants/actions';

export const increaseScale = (params) => {
    const newParams = {
        ... params,
        scale: params.scale + 0.25
    }
    return {
        type: SET_XYCANVAS_PARAM,
        params: newParams
    }
}

export const decreaseScale = (params) => {
    const newParams = {
        ...params,
        scale: params.scale - 0.25 <= 0 ? .25 : params.scale - 0.25
    }
    return {
        type: SET_XYCANVAS_PARAM,
        params: newParams
    }
}

export const panLeft = (params) => {
    const newParams = {
        ...params,
        panLeft: params.panLeft - 100
    }
    return {
        type: SET_XYCANVAS_PARAM,
        params: newParams
    }
}
