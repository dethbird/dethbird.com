import request from 'superagent';
import {
    GET_LOCATION_REQUEST,
    GET_LOCATION_ERROR,
    GET_LOCATION_SUCCESS,
    POST_LOCATION_REQUEST,
    POST_LOCATION_ERROR,
    POST_LOCATION_SUCCESS,
    PUT_LOCATION_REQUEST,
    PUT_LOCATION_ERROR,
    PUT_LOCATION_SUCCESS,
    RESET_LOCATION,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getLocationInit = () => {
    return {
        type: GET_LOCATION_REQUEST
    }
}

const getLocationSuccess = (project, location, form_mode) => {
    return {
        type: GET_LOCATION_SUCCESS,
        form_mode,
        project,
        location
    }
}

const getLocationError = () => {
    return {
        type: GET_LOCATION_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getLocation = (projectId, locationId) =>
    dispatch => {
        dispatch(getLocationInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const location = _.findWhere(project.locations, {
                    'id': parseInt(locationId)
                });
                const form_mode = location ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getLocationSuccess(project, location, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getLocationError())
            });
    };

/** POST */
const postLocationInit = ( project, location ) => {
    return {
        type: POST_LOCATION_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        location
    }
}

const postLocationSuccess = (project, location) => {
    return {
        type: POST_LOCATION_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        location
    }
}

const postLocationError = (project, location, errors) => {
    return {
        type: POST_LOCATION_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        location,
    }
}

export const postLocation = (project, fields) =>
    dispatch => {
        dispatch(postLocationInit());
        request.post('/api/project_location')
            .send( { ...fields, project_id: project.id } )
            .end((err, res) => {
                if(res.ok) {
                    const location = res.body;
                    dispatch(postLocationSuccess(project, location));
                }
                if(!res.ok)
                    dispatch(postLocationError(project, fields, res.body))
            });
    };

 /** PUT */
const putLocationInit = ( project, location ) => {
    return {
        type: PUT_LOCATION_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        location
    }
}

const putLocationSuccess = (project, location) => {
    return {
        type: PUT_LOCATION_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        location
    }
}

const putLocationError = (project, location, errors) => {
    return {
        type: PUT_LOCATION_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        location
    }
}

export const putLocation = (project, location, fields) =>
    dispatch => {
        dispatch(putLocationInit());
        request.put('/api/project_location/' + location.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putLocationSuccess(r));
                }

                if(!res.ok)
                    dispatch(putLocationError(project, {...fields, id: location.id }, res.body))
            });
    };

/** RESET */
export const resetLocation = (project, location, form_mode) => {
    return {
        type: RESET_LOCATION,
        form_mode,
        project,
        location
    }
}
