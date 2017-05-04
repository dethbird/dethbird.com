import request from 'superagent';
import { browserHistory } from 'react-router';
import { CONTACT } from 'constants/actions';

const contactRequestInit = () => {
    return {
        type: CONTACT.REQUEST
    }
}

const contactRequestSuccess = (model) => {
    return {
        type: CONTACT.SUCCESS,
        model
    }
}

const contactRequestError = (errors) => {
    return {
        type: CONTACT.ERROR,
        errors
    }
}

export const contactPost = (fields) =>
    dispatch => {
        dispatch(contactRequestInit());
        request.post(`/api/0.1/contact`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(contactRequestSuccess(res.body));
                } else {
                    dispatch(contactRequestError(res.body));
                }
        });
    };

export const contactReset = (fields) => {
    return {
        type: CONTACT.RESET
    }
}
