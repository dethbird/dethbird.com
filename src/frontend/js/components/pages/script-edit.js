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
import InputDescription from '../ui/input-description'
import { FountainFull } from '../ui/fountain-full'
import {
    ScriptBreadcrumb
} from './script/script-breadcrumb'

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
    getScript,
    postScript,
    putScript,
    resetScript
} from  '../../actions/script'

const ScriptEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                name: null,
                description: null,
                script: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { script } = this.props;
        if( script==undefined && nextProps.script){
            this.setState({
                changedFields: {
                    name: nextProps.script.name,
                    description: nextProps.script.description,
                    script: nextProps.script.script
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { scriptId } = this.props.params;

        dispatch(getScript(scriptId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, script } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;
        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetScript( script, form_mode ));
    },
    handleClickCancel(event) {
        event.preventDefault()
        browserHistory.push(
            '/project/' + this.props.params.projectId
            + '/script/' + this.props.params.scriptId
        )
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, script } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postScript(changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putScript( script, changedFields));
    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, script } = this.props;
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

                <ScriptBreadcrumb { ...this.props }></ScriptBreadcrumb>

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

                    <InputDescription
                        label="Script"
                        id="script"
                        value={ changedFields.script || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('script') }
                    />

                    <Card className='input-card'>
                        <CardText>
                            <FountainFull source={ changedFields.script }  />
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
})

const mapStateToProps = (state) => {
    const { ui_state, form_mode, errors, script } = state.script;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        errors,
        script
    }
}

export default connect(mapStateToProps)(ScriptEdit);
