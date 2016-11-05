import request from 'superagent';
import {
    GET_STORYBOARD_PANEL_REQUEST,
    GET_STORYBOARD_PANEL_ERROR,
    GET_STORYBOARD_PANEL_SUCCESS,
} from '../constants/actions';

const getStoryboardPanelInit = () => {
    return {
        type: GET_STORYBOARD_PANEL_REQUEST
    }
}

const getStoryboardPanelSuccess = (project, storyboard, panel) => {
    return {
        type: GET_STORYBOARD_PANEL_SUCCESS,
        project,
        storyboard,
        panel
    }
}

const getStoryboardPanelError = () => {
    return {
        type: GET_STORYBOARD_PANEL_ERROR
    }
}

export const getStoryboardPanel = (projectId, storyboardId, panelId) =>
    dispatch => {
        dispatch(getStoryboardPanelInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const storyboard = _.findWhere(project.storyboards, {
                    'id': parseInt(storyboardId)
                });
                const panel = _.findWhere(storyboard.panels, {
                    'id': parseInt(panelId)
                });
                dispatch(getStoryboardPanelSuccess(project, storyboard, panel));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getStoryboardPanelError())
            });
    };
