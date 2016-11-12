import request from 'superagent';
import {
    GET_CHARACTER_REVISION_REQUEST,
    GET_CHARACTER_REVISION_ERROR,
    GET_CHARACTER_REVISION_SUCCESS,
    POST_CHARACTER_REVISION_REQUEST,
    POST_CHARACTER_REVISION_ERROR,
    POST_CHARACTER_REVISION_SUCCESS,
    PUT_CHARACTER_REVISION_REQUEST,
    PUT_CHARACTER_REVISION_ERROR,
    PUT_CHARACTER_REVISION_SUCCESS,
    RESET_CHARACTER_REVISION,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getCharacterRevisionInit = () => {
    return {
        type: GET_CHARACTER_REVISION_REQUEST
    }
}

const getCharacterRevisionSuccess = (project, character, revision, form_mode) => {
    return {
        type: GET_CHARACTER_REVISION_SUCCESS,
        form_mode,
        project,
        character,
        revision
    }
}

const getCharacterRevisionError = () => {
    return {
        type: GET_CHARACTER_REVISION_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getCharacterRevision = (projectId, characterId, revisionId) =>
    dispatch => {
        dispatch(getCharacterRevisionInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const character = _.findWhere(project.characters, {
                    'id': parseInt(characterId)
                });
                const revision = _.findWhere(character.revisions, {
                    'id': parseInt(revisionId)
                });
                const form_mode = revision ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getCharacterRevisionSuccess(project, character, revision, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getCharacterRevisionError())
            });
    };

/** POST */
const postCharacterRevisionInit = ( project, character, revision ) => {
    return {
        type: POST_CHARACTER_REVISION_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        character,
        revision
    }
}

const postCharacterRevisionSuccess = (project, character, revision) => {
    return {
        type: POST_CHARACTER_REVISION_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        character,
        revision
    }
}

const postCharacterRevisionError = (project, character, revision, errors) => {
    return {
        type: POST_CHARACTER_REVISION_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        character,
        revision
    }
}

export const postCharacterRevision = (project, character, fields) =>
    dispatch => {
        dispatch(postCharacterRevisionInit());
        request.post('/api/project_character_revision')
            .send( { ...fields, character_id: character.id } )
            .end((err, res) => {
                if(res.ok) {
                    const revision = res.body;
                    dispatch(postCharacterRevisionSuccess(project, character, revision));
                }
                if(!res.ok)
                    dispatch(postCharacterRevisionError(project, character, fields, res.body))
            });
    };

 /** PUT */
const putCharacterRevisionInit = ( project, character, revision ) => {
    return {
        type: PUT_CHARACTER_REVISION_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        character,
        revision
    }
}

const putCharacterRevisionSuccess = (project, character, revision) => {
    return {
        type: PUT_CHARACTER_REVISION_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        character,
        revision
    }
}

const putCharacterRevisionError = (project, character, revision, errors) => {
    return {
        type: PUT_CHARACTER_REVISION_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        character,
        revision
    }
}

export const putCharacterRevision = (project, character, revision, fields) =>
    dispatch => {
        dispatch(putCharacterRevisionInit());
        request.put('/api/project_character_revision/' + revision.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putCharacterRevisionSuccess(project, character, r));
                }

                if(!res.ok)
                    dispatch(putCharacterRevisionError(project, character, {...fields, id: character.id, revisions: character.revisions }, res.body))
            });
    };


/** RESET */
export const resetCharacterRevision = (project, character, revision, form_mode) => {
    return {
        type: RESET_CHARACTER_REVISION,
        form_mode,
        project,
        character,
        revision
    }
}
