import request from 'superagent';
import {
    GET_CONCEPT_ART_REVISION_REQUEST,
    GET_CONCEPT_ART_REVISION_ERROR,
    GET_CONCEPT_ART_REVISION_SUCCESS,
    POST_CONCEPT_ART_REVISION_REQUEST,
    POST_CONCEPT_ART_REVISION_ERROR,
    POST_CONCEPT_ART_REVISION_SUCCESS,
    PUT_CONCEPT_ART_REVISION_REQUEST,
    PUT_CONCEPT_ART_REVISION_ERROR,
    PUT_CONCEPT_ART_REVISION_SUCCESS,
    RESET_CONCEPT_ART_REVISION,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getConceptArtRevisionInit = () => {
    return {
        type: GET_CONCEPT_ART_REVISION_REQUEST
    }
}

const getConceptArtRevisionSuccess = (project, concept_art, revision, form_mode) => {
    return {
        type: GET_CONCEPT_ART_REVISION_SUCCESS,
        form_mode,
        project,
        concept_art,
        revision
    }
}

const getConceptArtRevisionError = () => {
    return {
        type: GET_CONCEPT_ART_REVISION_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getConceptArtRevision = (projectId, conceptArtId, revisionId) =>
    dispatch => {
        dispatch(getConceptArtRevisionInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const concept_art = _.findWhere(project.concept_art, {
                    'id': parseInt(conceptArtId)
                });
                const revision = _.findWhere(concept_art.revisions, {
                    'id': parseInt(revisionId)
                });
                const form_mode = revision ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getConceptArtRevisionSuccess(project, concept_art, revision, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getConceptArtRevisionError())
            });
    };

/** POST */
const postConceptArtRevisionInit = ( project, concept_art, revision ) => {
    return {
        type: POST_CONCEPT_ART_REVISION_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        concept_art,
        revision
    }
}

const postConceptArtRevisionSuccess = (project, concept_art, revision) => {
    return {
        type: POST_CONCEPT_ART_REVISION_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        concept_art,
        revision
    }
}

const postConceptArtRevisionError = (project, concept_art, revision, errors) => {
    return {
        type: POST_CONCEPT_ART_REVISION_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        concept_art,
        revision
    }
}

export const postConceptArtRevision = (project, concept_art, fields) =>
    dispatch => {
        dispatch(postConceptArtRevisionInit());
        request.post('/api/project_concept_art_revision')
            .send( { ...fields, concept_art_id: concept_art.id } )
            .end((err, res) => {
                if(res.ok) {
                    const revision = res.body;
                    dispatch(postConceptArtRevisionSuccess(project, concept_art, revision));
                }
                if(!res.ok)
                    dispatch(postConceptArtRevisionError(project, concept_art, fields, res.body))
            });
    };

 /** PUT */
const putConceptArtRevisionInit = ( project, concept_art, revision ) => {
    return {
        type: PUT_CONCEPT_ART_REVISION_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        concept_art,
        revision
    }
}

const putConceptArtRevisionSuccess = (project, concept_art, revision) => {
    return {
        type: PUT_CONCEPT_ART_REVISION_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        concept_art,
        revision
    }
}

const putConceptArtRevisionError = (project, concept_art, revision, errors) => {
    return {
        type: PUT_CONCEPT_ART_REVISION_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        concept_art,
        revision
    }
}

export const putConceptArtRevision = (project, concept_art, revision, fields) =>
    dispatch => {
        dispatch(putConceptArtRevisionInit());
        request.put('/api/project_concept_art_revision/' + revision.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putConceptArtRevisionSuccess(project, concept_art, r));
                }

                if(!res.ok)
                    dispatch(putConceptArtRevisionError(project, concept_art, {...fields, id: concept_art.id, revisions: concept_art.revisions }, res.body))
            });
    };


/** RESET */
export const resetConceptArtRevision = (project, concept_art, revision, form_mode) => {
    return {
        type: RESET_CONCEPT_ART_REVISION,
        form_mode,
        project,
        concept_art,
        revision
    }
}
