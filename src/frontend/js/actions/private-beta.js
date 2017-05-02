import request from 'superagent';
import { browserHistory } from 'react-router';
import { PRIVATEBETA } from 'constants/actions';

const privatebetaRequestInit = () => {
    return {
        type: PRIVATEBETA.REQUEST
    }
}

const privatebetaRequestSuccess = (model) => {
    return {
        type: PRIVATEBETA.SUCCESS,
        model
    }
}

const privatebetaRequestError = (errors) => {
    return {
        type: PRIVATEBETA.ERROR,
        errors
    }
}


export const privatebetaPost = (fields) =>
    dispatch => {
        dispatch(privatebetaRequestInit());
        request.post(`/api/0.1/privatebeta`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(privatebetaRequestSuccess(res.body));
                    browserHistory.replace(`/privatebeta/${res.body.id}/edit`);
                } else {
                    dispatch(privatebetaRequestError(res.body));
                }
        });
    };
