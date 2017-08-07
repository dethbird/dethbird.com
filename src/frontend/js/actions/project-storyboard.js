import request from 'superagent';
import { find } from 'lodash';

import { PROJECT_STORYBOARD } from 'constants/actions';

const projectStoryboardGetInit = () => {
    return {
        type: PROJECT_STORYBOARD.REQUEST
    }
}

const projectStoryboardGetSuccess = (project, storyboard) => {
    return {
        type: PROJECT_STORYBOARD.SUCCESS,
        project,
        storyboard
    }
}

const projectStoryboardGetError = () => {
    return {
        type: PROJECT_STORYBOARD.ERROR
    }
}

export const projectStoryboardGet = (projectId, storyboardId) =>
    dispatch => {
        dispatch(projectStoryboardGetInit());
        request.get('/proxy/api/0.1/projects')
            .then((res) => {
                const projects = res.body;
                const project = find(projects, {id: parseInt(projectId)});
                if (!project)
                    dispatch(projectStoryboardGetError());
                const storyboard = find(project.storyboards, {id: parseInt(storyboardId)});
                if (!storyboard)
                    dispatch(projectStoryboardGetError());
                dispatch(projectStoryboardGetSuccess(project, storyboard))
            })
            .catch(() => dispatch(projectStoryboardGetError()));
    };
