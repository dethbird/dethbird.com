import request from 'superagent';

import { THING } from 'constants/actions';

const getThingInit = () => {
    return {
        type: THING.REQUEST
    }
}

const getThingSuccess = (data) => {
    return {
        type: THING.SUCCESS,
        data: data
    }
}

const getThingError = () => {
    return {
        type: THING.ERROR
    }
}

export const getThing = (name) =>
    dispatch => {
        dispatch(getThingInit());
        request.get(`/data/thing/${name}`)
            .then((res) => dispatch(getThingSuccess(res.body)))
            .catch(() => dispatch(getThingError()));
    };
