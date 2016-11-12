import request from 'superagent';
import {
    GET_CONCEPT_ART_REQUEST,
    GET_CONCEPT_ART_ERROR,
    GET_CONCEPT_ART_SUCCESS,
    POST_CONCEPT_ART_REQUEST,
    POST_CONCEPT_ART_ERROR,
    POST_CONCEPT_ART_SUCCESS,
    PUT_CONCEPT_ART_REQUEST,
    PUT_CONCEPT_ART_ERROR,
    PUT_CONCEPT_ART_SUCCESS,
    REORDER_CONCEPT_ART_REVISIONS_REQUEST,
    REORDER_CONCEPT_ART_REVISIONS_ERROR,
    REORDER_CONCEPT_ART_REVISIONS_SUCCESS,
    RESET_CONCEPT_ART,
} from '../constants/actions';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../constants/form';

/** GET */
const getConceptArtInit = () => {
    return {
        type: GET_CONCEPT_ART_REQUEST
    }
}

const getConceptArtSuccess = (project, concept_art, form_mode) => {
    return {
        type: GET_CONCEPT_ART_SUCCESS,
        form_mode,
        project,
        concept_art
    }
}

const getConceptArtError = () => {
    return {
        type: GET_CONCEPT_ART_SUCCESS,
        form_mode: FORM_MODE_ADD
    }
}

export const getConceptArt = (projectId, conceptArtId) =>
    dispatch => {
        dispatch(getConceptArtInit());
        request.get(`/api/project/${projectId}`)
            .then((res) => {
                const project = res.body;
                const concept_art = _.findWhere(project.concept_art, {
                    'id': parseInt(conceptArtId)
                });
                const form_mode = concept_art ? FORM_MODE_EDIT : FORM_MODE_ADD;
                dispatch(getConceptArtSuccess(project, concept_art, form_mode));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getConceptArtError())
            });
    };

/** POST */
const postConceptArtInit = ( project, concept_art ) => {
    return {
        type: POST_CONCEPT_ART_REQUEST,
        form_mode: FORM_MODE_ADD,
        project,
        concept_art
    }
}

const postConceptArtSuccess = (project, concept_art) => {
    return {
        type: POST_CONCEPT_ART_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        concept_art
    }
}

const postConceptArtError = (project, concept_art, errors) => {
    return {
        type: POST_CONCEPT_ART_ERROR,
        errors,
        form_mode: FORM_MODE_ADD,
        project,
        concept_art,
    }
}

export const postConceptArt = (project, fields) =>
    dispatch => {
        dispatch(postConceptArtInit());
        request.post('/api/project_concept_art')
            .send( { ...fields, project_id: project.id } )
            .end((err, res) => {
                if(res.ok) {
                    const concept_art = res.body;
                    dispatch(postConceptArtSuccess(project, concept_art));
                }
                if(!res.ok)
                    dispatch(postConceptArtError(project, fields, res.body))
            });
    };

 /** PUT */
const putConceptArtInit = ( project, concept_art ) => {
    return {
        type: PUT_CONCEPT_ART_REQUEST,
        form_mode: FORM_MODE_EDIT,
        project,
        concept_art
    }
}

const putConceptArtSuccess = (project, concept_art) => {
    return {
        type: PUT_CONCEPT_ART_SUCCESS,
        form_mode: FORM_MODE_EDIT,
        project,
        concept_art
    }
}

const putConceptArtError = (project, concept_art, errors) => {
    return {
        type: PUT_CONCEPT_ART_ERROR,
        form_mode: FORM_MODE_EDIT,
        errors,
        project,
        concept_art
    }
}

export const putConceptArt = (project, concept_art, fields) =>
    dispatch => {
        dispatch(putConceptArtInit());
        request.put('/api/project_concept_art/' + concept_art.id)
            .send(fields)
            .end((err, res) => {
                if(res.ok) {
                    const r = res.body;
                    dispatch(putConceptArtSuccess(project, r));
                }

                if(!res.ok)
                    dispatch(putConceptArtError(project, {...fields, id: concept_art.id, revisions: concept_art.revisions }, res.body))
            });
    };

/** REORDER */
const reorderConceptArtRevisionsInit = ( project, concept_art, form_mode ) => {
   return {
       type: REORDER_CONCEPT_ART_REVISIONS_REQUEST,
       form_mode,
       project,
       concept_art
   }
}

const reorderConceptArtRevisionsSuccess = (project, concept_art, form_mode) => {
   return {
       type: REORDER_CONCEPT_ART_REVISIONS_SUCCESS,
       form_mode,
       project,
       concept_art
   }
}

const reorderConceptArtRevisionsError = (project, concept_art, form_mode, errors) => {
   return {
       type: REORDER_CONCEPT_ART_REVISIONS_ERROR,
       form_mode,
       errors,
       project,
       concept_art
   }
}

export const reorderConceptArtRevisions = (project, concept_art, form_mode, items) =>
   dispatch => {
       dispatch(reorderConceptArtRevisionsInit(project, concept_art, form_mode));
       request.post('/api/project_concept_art_revision_order')
           .send({items})
           .end((err, res) => {
               if(res.ok) {
                   dispatch(reorderConceptArtRevisionsSuccess(project, concept_art, form_mode));
               }

               if(!res.ok)
                   dispatch(reorderConceptArtRevisionsError(project, concept_art, form_mode, res.body))
           });
   };

/** RESET */
export const resetConceptArt = (project, concept_art, form_mode) => {
    return {
        type: RESET_CONCEPT_ART,
        form_mode,
        project,
        concept_art
    }
}
