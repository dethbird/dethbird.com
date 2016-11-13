import React from 'react'
import {
    SortableItems,
    SortableItem
} from 'react-sortable-component'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { CardActions, CardText } from 'material-ui/Card';

import InputText from '../ui/input-text'

import { Card } from '../ui/card'
import { ButtonsForm } from '../ui/buttons-form'
import { Description } from '../ui/description'
import { Image } from "../ui/image"
import InputDescription from '../ui/input-description'
import { Section } from "../ui/section"
import UiState from '../ui/ui-state'

import {
    ConceptArtBreadcrumb
} from "./concept_art/concept_art-breadcrumb"
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../../constants/form';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import {
    getConceptArt,
    postConceptArt,
    putConceptArt,
    resetConceptArt,
    reorderConceptArtRevisions
} from  '../../actions/concept_art'

const ConceptArtEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                name: null,
                description: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { concept_art } = this.props;
        if( concept_art==undefined && nextProps.concept_art){
            this.setState({
                changedFields: {
                    name: nextProps.concept_art.name,
                    description: nextProps.concept_art.description
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, conceptArtId } = this.props.params;
        dispatch(getConceptArt(projectId, conceptArtId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, project, concept_art } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetConceptArt( project, concept_art, form_mode ));
    },
    handleClickCancel(event) {
        const { projectId, conceptArtId } = this.props.params;
        event.preventDefault()
        browserHistory.push(
            `/project/${projectId}/concept_art/${conceptArtId}`
        )
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project, concept_art } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postConceptArt(project, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putConceptArt( project, concept_art, changedFields));
    },
    handleSort(items) {
        const { dispatch, form_mode, project, concept_art } = this.props;
        const { changedFields } = this.state;

        let newConceptArt = changedFields;
        newConceptArt.revisions = items;

        items = items.map(function(item, i){
            return (
                { 'id': item.id }
            );
        });

        dispatch(reorderConceptArtRevisions( project, newConceptArt, form_mode, items));

    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, project, concept_art } = this.props;
        const getErrorForId = (id) => {
            const error = _.findWhere(errors, {
                'property': id
            });
            if(error)
                return error.message
            return null;
        };


        let sortableNode;
        if (concept_art) {
            let concept_artRevisionNodes;
            if (concept_art.revisions) {
                concept_artRevisionNodes = concept_art.revisions.map(function(revision, i) {
                    return (
                        <SortableItem
                            key={ revision.id }
                            className="content-secondary"
                        >
                            <Card>
                                <Image src={ revision.content } />
                                <Description source={ revision.description } />
                            </Card>
                        </SortableItem>
                    );
                });

                sortableNode = (
                    <div>
                        <Section title="Revisions" subtitle="Drag to reorder" count={ concept_art.revisions.length } className='content-primary'></Section>

                        <SortableItems
                            items={ concept_art.revisions }
                            onSort={ this.handleSort }
                            name="sort-revisions-component"
                            className='content-primary'
                        >
                            { concept_artRevisionNodes }
                        </SortableItems>
                    </div>
                );
            }
        }

        return (
            <div>
                <ConceptArtBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <form>

                    <InputText
                        label="Name"
                        id="name"
                        value={ changedFields.name || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('name') }
                    />

                    <InputDescription
                        label="Description"
                        id="description"
                        value={ changedFields.description || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('description') }
                    />

                    <Card className='input-card'>
                        <CardText>
                            <Description source={ changedFields.description }  />
                        </CardText>
                    </Card>


                    <ButtonsForm
                        handleClickCancel={ this.handleClickCancel }
                        handleClickSubmit={ this.handleClickSubmit }
                    />

                    { sortableNode }

                </form>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    const { ui_state, form_mode, errors, project, concept_art } = state.conceptArt;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        errors,
        project,
        concept_art
    }
}

export default connect(mapStateToProps)(ConceptArtEdit);
