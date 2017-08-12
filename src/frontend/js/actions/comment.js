import request from 'superagent';

import { COMMENT } from 'constants/actions';

const commentRequestInit = (uuid) => {
    return {
        type: COMMENT.REQUEST,
        uuid
    }
}

const commentPostSuccess = (model, uuid) => {
    return {
        type: COMMENT.SUCCESS,
        model,
        uuid
    }
}

const commentPostError = (errors, uuid) => {
    return {
        type: COMMENT.ERROR,
        errors,
        uuid
    }
}

export const commentPost = (payload, uuid, onAddPanelComment) => 
    dispatch => {
        dispatch(commentRequestInit(uuid));
        request.post('/proxy/api/0.1/comment')
            .send(payload)
            .end(function (err, res) {
                if (res.ok) {
                    dispatch(commentPostSuccess(res.body, uuid));
                    setTimeout(onAddPanelComment, 1200);
                } else {
                    dispatch(commentPostError(res.body, uuid));
                }
            });
    }
