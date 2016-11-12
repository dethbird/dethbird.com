import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { CardActions, CardText } from 'material-ui/Card';

import { Card } from '../ui/card'
import { ButtonsForm } from '../ui/buttons-form'
import { ContentEdit } from '../ui/content-edit'
import { Description } from '../ui/description'
import InputDescription from '../ui/input-description'
import { Section } from '../ui/section'
import {
    CharacterBreadcrumb
} from './character/character-breadcrumb'
import UiState from '../ui/ui-state'
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../../constants/form';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import {
    getCharacterRevision,
    postCharacterRevision,
    putCharacterRevision,
    resetCharacterRevision
} from  '../../actions/character-revision'

const CharacterRevisionEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                content: null,
                description: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { revision } = this.props;
        if( revision==undefined && nextProps.revision){
            this.setState({
                changedFields: {
                    content: nextProps.revision.content,
                    description: nextProps.revision.description
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const {
            projectId,
            characterId,
            revisionId
        } = this.props.params;

        dispatch(getCharacterRevision(
            projectId,
            characterId,
            revisionId));
    },
    handleContentSelection(event) {
        event.preventDefault()
        this.handleFieldChange({
            target: {
                id: 'content',
                value: event.target.src
            }
        })
    },
    handleFieldChange(event) {
        const { dispatch, project, character, revision, form_mode } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;
        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetCharacterRevision( project, character, revision, form_mode ));
    },
    handleClickCancel(event) {
        event.preventDefault();
        browserHistory.push(
            '/project/' + this.props.params.projectId
            + '/character/' + this.props.params.characterId
        );
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project, character, revision } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postCharacterRevision(project, character, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putCharacterRevision( project, character, revision, changedFields));

    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, project, character, revision, form_mode, errors } = this.props;
        const getErrorForId = (id) => {
            const error = _.findWhere(errors, {
                'property': id
            });
            if(error)
                return error.message
            return null;
        }

        return (
            <div>
                <CharacterBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <form>

                    <ContentEdit
                        id="content"
                        value={ changedFields.content || '' }
                        handleFieldChange={ this.handleFieldChange }
                        errorText={ getErrorForId('content') }
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
                </form>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, project, character, revision, form_mode, errors } = state.characterRevision;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        project,
        character,
        revision,
        errors
    }
}

export default connect(mapStateToProps)(CharacterRevisionEdit);
