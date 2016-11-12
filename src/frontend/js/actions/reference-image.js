import request from 'superagent';
import {
    GET_REFERENCE_IMAGE_REQUEST,
    GET_REFERENCE_IMAGE_ERROR,
    GET_REFERENCE_IMAGE_SUCCESS,
    POST_REFERENCE_IMAGE_REQUEST,
    POST_REFERENCE_IMAGE_ERROR,
    POST_REFERENCE_IMAGE_SUCCESS,
    PUT_REFERENCE_IMAGE_REQUEST,
    PUT_REFERENCE_IMAGE_ERROR,
    PUT_REFERENCE_IMAGE_SUCCESS,
    RESET_REFERENCE_IMAGE,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getReferenceImageInit = () => {
    return {
        type: GET_REFERENCE_IMAGE_REQUEST
    }
}

const getReferenceImageSuccess = (project, reference_image, form_mode) => {
    return {
        type: GET_REFERENCE_IMAGE_SUCCESS,
        form_mode,
        project,
        reference_image
    }
}

const getReferenceImageError = () => {
    return {
        type: GET_REFERENCE_IMAGE_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getReferenceImage = (projectId, referenceImageId) =>
    dispatch => {
        dispatch(getReferenceImageInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const reference_image = _.findWhere(project.reference_images, {
                    'id': parseInt(referenceImageId)
                });
                const form_mode = reference_image ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getReferenceImageSuccess(project, reference_image, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getReferenceImageError())
            });
    };

/** POST */
const postReferenceImageInit = ( project, reference_image ) => {
    return {
        type: POST_REFERENCE_IMAGE_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        reference_image
    }
}

const postReferenceImageSuccess = (project, reference_image) => {
    return {
        type: POST_REFERENCE_IMAGE_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        reference_image
    }
}

const postReferenceImageError = (project, reference_image, errors) => {
    return {
        type: POST_REFERENCE_IMAGE_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        reference_image,
    }
}

export const postReferenceImage = (project, fields) =>
    dispatch => {
        dispatch(postReferenceImageInit());
        request.post('/api/project_reference_image')
            .send( { ...fields, project_id: project.id } )
            .end((err, res) => {
                if(res.ok) {
                    const reference_image = res.body;
                    dispatch(postReferenceImageSuccess(project, reference_image));
                }
                if(!res.ok)
                    dispatch(postReferenceImageError(project, fields, res.body))
            });
    };

 /** PUT */
const putReferenceImageInit = ( project, reference_image ) => {
    return {
        type: PUT_REFERENCE_IMAGE_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        reference_image
    }
}

const putReferenceImageSuccess = (project, reference_image) => {
    return {
        type: PUT_REFERENCE_IMAGE_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        reference_image
    }
}

const putReferenceImageError = (project, reference_image, errors) => {
    return {
        type: PUT_REFERENCE_IMAGE_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        reference_image
    }
}

export const putReferenceImage = (project, reference_image, fields) =>
    dispatch => {
        dispatch(putReferenceImageInit());
        request.put('/api/project_reference_image/' + reference_image.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putReferenceImageSuccess(r));
                }

                if(!res.ok)
                    dispatch(putReferenceImageError(project, {...fields, id: reference_image.id }, res.body))
            });
    };

/** RESET */
export const resetReferenceImage = (project, reference_image, form_mode) => {
    return {
        type: RESET_REFERENCE_IMAGE,
        form_mode,
        project,
        reference_image
    }
}
