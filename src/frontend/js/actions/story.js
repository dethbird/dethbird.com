import request from 'superagent';
import { browserHistory } from 'react-router';
import { STORY, STORIES } from 'constants/actions';


const storiesRequestInit = () => {
    return {
        type: STORIES.REQUEST
    }
}

const storiesRequestSuccess = (models) => {
    return {
        type: STORIES.SUCCESS,
        models
    }
}

const storiesRequestError = (errors) => {
    return {
        type: STORIES.ERROR,
        errors
    }
}


export const storiesGet = (filter) =>
    dispatch => {
        dispatch(storiesRequestInit());
        request.get(`/api/0.1/stories`)
            .query(filter ? filter : {})
            .end(function(err, res){
                if(res.ok) {
                    dispatch(storiesRequestSuccess(res.body));
                } else {
                    dispatch(storiesRequestError(res.body));
                }
        });
    };

const storyRequestInit = () => {
    return {
        type: STORY.REQUEST
    }
}

const storyRequestSuccess = (model) => {
    return {
        type: STORY.SUCCESS,
        model
    }
}

const storyRequestError = (errors) => {
    return {
        type: STORY.ERROR,
        errors
    }
}


export const storyGet = (id) =>
    dispatch => {
        dispatch(storyRequestInit());
        request.get(`/api/0.1/story/${id}`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(storyRequestSuccess(res.body));
                } else {
                    dispatch(storyRequestError(res.body));
                }
        });
    };

export const storyGetDemo = () =>
    dispatch => {
        dispatch(storyRequestInit());
        request.get(`/api/0.1/story/1`)
            .set('X-Demo-Request', 'true')
            .end(function(err, res){
                if(res.ok) {
                    dispatch(storyRequestSuccess(res.body));
                } else {
                    dispatch(storyRequestError(res.body));
                }
        });
    };


export const storyPut = (id, fields) =>
    dispatch => {
        dispatch(storyRequestInit());
        request.put(`/api/0.1/story/${id}`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(storyRequestSuccess(res.body));
                } else {
                    dispatch(storyRequestError(res.body));
                }
        });
    };

export const storyPutDemo = (fields) =>
    dispatch => {
        dispatch(storyRequestInit());
        request.get(`/api/0.1/story/1`)
            .set('X-Demo-Request', 'true')
            .end(function(err, res){
                if(res.ok) {
                    dispatch(storyRequestSuccess({ ... res.body, ... fields }));
                } else {
                    dispatch(storyRequestError(res.body));
                }
        });
    };

export const storyPost = (fields) =>
    dispatch => {
        dispatch(storyRequestInit());
        request.post(`/api/0.1/story`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(storyRequestSuccess(res.body));
                    browserHistory.replace(`/story/${res.body.id}/edit`);
                } else {
                    dispatch(storyRequestError(res.body));
                }
        });
    };
