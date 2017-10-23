import request from 'superagent';

import { WUNDERLIST } from 'constants/actions';

const getAllTasksInit = () => {
    return {
        type: WUNDERLIST.REQUEST
    }
}

const getAllTasksSuccess = (data) => {
    return {
        type: WUNDERLIST.SUCCESS,
        data: data
    }
}

const getAllTasksError = () => {
    return {
        type: WUNDERLIST.ERROR
    }
}

export const getAllTasks = () =>
    dispatch => {
        dispatch(getAllTasksInit());
        request.get('/proxy/api/0.1/service/wunderlist/tasks/all')
            .then((res) => dispatch(getAllTasksSuccess(res.body)))
            .catch(() => dispatch(getAllTasksError()));
    };
