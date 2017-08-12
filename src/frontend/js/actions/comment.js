import request from 'superagent';

import { COMMENT } from 'constants/actions';

const commentRequestInit = () => {
    return {
        type: COMMENT.REQUEST
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

export const commentPost = (fields, uuid) => 
    dispatch => {
        let payload = { 
            ...fields,
            entity_table_name: 'project_storyboard_panels'
        };
        dispatch(commentRequestInit());
        request.post('/proxy/api/0.1/comment')
            .send({ ...payload })
            .end(function (err, res) {
                if (res.ok) {
                    dispatch(commentPostSuccess(res.body, uuid));
                } else {
                    console.log('error!', res.body);
                    dispatch(commentPostError(res.body, uuid));
                }
            });
    }
