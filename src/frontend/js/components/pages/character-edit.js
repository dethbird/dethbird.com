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
    CharacterBreadcrumb
} from "./character/character-breadcrumb"
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../../constants/form';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import {
    getCharacter,
    postCharacter,
    putCharacter,
    resetCharacter,
    reorderCharacterRevisions
} from  '../../actions/character'

const CharacterEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                name: null,
                description: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { character } = this.props;
        if( character==undefined && nextProps.character){
            this.setState({
                changedFields: {
                    name: nextProps.character.name,
                    description: nextProps.character.description
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, characterId } = this.props.params;
        dispatch(getCharacter(projectId, characterId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, project, character } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetCharacter( project, character, form_mode ));
    },
    handleClickCancel(event) {
        const { projectId, characterId } = this.props.params;
        event.preventDefault()
        browserHistory.push(
            `/project/${projectId}/character/${characterId}`
        )
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project, character } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postCharacter(project, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putCharacter( project, character, changedFields));
    },
    handleSort(items) {
        const { dispatch, form_mode, project, character } = this.props;
        const { changedFields } = this.state;

        let newCharacter = changedFields;
        newCharacter.revisions = items;

        items = items.map(function(item, i){
            return (
                { 'id': item.id }
            );
        });

        dispatch(reorderCharacterRevisions( project, newCharacter, form_mode, items));

    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, project, character } = this.props;
        const getErrorForId = (id) => {
            const error = _.findWhere(errors, {
                'property': id
            });
            if(error)
                return error.message
            return null;
        };


        let sortableNode;
        if (character) {
            let characterRevisionNodes;
            if (character.revisions) {
                characterRevisionNodes = character.revisions.map(function(revision, i) {
                    return (
                        <SortableItem
                            key={ revision.id }
                            className="card col-xs-3"
                        >
                            <Card>
                                <Image src={ revision.content } />
                            </Card>
                        </SortableItem>
                    );
                });

                sortableNode = (
                    <div>
                        <Section title="Revisions" subtitle="Drag to reorder" count={ character.revisions.length }></Section>

                        <SortableItems
                            items={ character.revisions }
                            onSort={ this.handleSort }
                            name="sort-revisions-component"
                        >
                            { characterRevisionNodes }
                        </SortableItems>
                    </div>
                );
            }
        }

        return (
            <div>
                <CharacterBreadcrumb { ...this.props } />

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
    const { ui_state, form_mode, errors, project, character } = state.character;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        errors,
        project,
        character
    }
}

export default connect(mapStateToProps)(CharacterEdit);
