import request from 'superagent';
import {
    GET_CHARACTER_REQUEST,
    GET_CHARACTER_ERROR,
    GET_CHARACTER_SUCCESS,
    POST_CHARACTER_REQUEST,
    POST_CHARACTER_ERROR,
    POST_CHARACTER_SUCCESS,
    PUT_CHARACTER_REQUEST,
    PUT_CHARACTER_ERROR,
    PUT_CHARACTER_SUCCESS,
    RESET_CHARACTER,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getCharacterInit = () => {
    return {
        type: GET_CHARACTER_REQUEST
    }
}

const getCharacterSuccess = (project, character, form_mode) => {
    return {
        type: GET_CHARACTER_SUCCESS,
        form_mode,
        project,
        character
    }
}

const getCharacterError = () => {
    return {
        type: GET_CHARACTER_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getCharacter = (projectId, characterId) =>
    dispatch => {
        dispatch(getCharacterInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const character = _.findWhere(project.characters, {
                    'id': parseInt(characterId)
                });
                const form_mode = character ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getCharacterSuccess(project, character, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getCharacterError())
            });
    };

/** POST */
const postCharacterInit = ( project, character ) => {
    return {
        type: POST_CHARACTER_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        character
    }
}

const postCharacterSuccess = (project, character) => {
    return {
        type: POST_CHARACTER_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        character
    }
}

const postCharacterError = (project, character, errors) => {
    return {
        type: POST_CHARACTER_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        character,
    }
}

export const postCharacter = (project, fields) =>
    dispatch => {
        dispatch(postCharacterInit());
        request.post('/api/project_character')
            .send( { ...fields, project_id: project.id } )
            .end((err, res) => {
                if(res.ok) {
                    const character = res.body;
                    dispatch(postCharacterSuccess(project, character));
                }
                if(!res.ok)
                    dispatch(postCharacterError(project, fields, res.body))
            });
    };

 /** PUT */
const putCharacterInit = ( project, character ) => {
    return {
        type: PUT_CHARACTER_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        character
    }
}

const putCharacterSuccess = (project, character) => {
    return {
        type: PUT_CHARACTER_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        character
    }
}

const putCharacterError = (project, character, errors) => {
    return {
        type: PUT_CHARACTER_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        character
    }
}

export const putCharacter = (project, character, fields) =>
    dispatch => {
        dispatch(putCharacterInit());
        request.put('/api/project_character/' + character.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putCharacterSuccess(r));
                }

                if(!res.ok)
                    dispatch(putCharacterError(project, {...fields, id: character.id }, res.body))
            });
    };

/** RESET */
export const resetCharacter = (project, character, form_mode) => {
    return {
        type: RESET_CHARACTER,
        form_mode,
        project,
        character
    }
}
