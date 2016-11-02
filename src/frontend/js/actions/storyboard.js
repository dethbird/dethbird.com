import request from 'superagent';
import {
    GET_STORYBOARD_REQUEST,
    GET_STORYBOARD_ERROR,
    GET_STORYBOARD_SUCCESS,
} from '../constants/actions';

const getStoryboardInit = () => {
    return {
        type: GET_STORYBOARD_REQUEST
    }
}

const getStoryboardSuccess = (project, storyboard) => {
    return {
        type: GET_STORYBOARD_SUCCESS,
        project,
        storyboard
    }
}

const getStoryboardError = () => {
    return {
        type: GET_STORYBOARD_ERROR
    }
}

export const getStoryboard = (projectId, storyboardId) =>
    dispatch => {
        dispatch(getStoryboardInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const storyboard = _.findWhere(project.storyboards, {
                    'id': parseInt(storyboardId)
                });
                dispatch(getStoryboardSuccess(project, storyboard));
            })
            .catch((error) => {
                dispatch(getStoryboardError())
            });
    };
