import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Checkbox,
    Container,
    Form,
    Icon,
    Image,
    Label,
    Menu,
    Message
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import { UI_STATE } from 'constants/ui-state';
import { userGet, userPut, userPost, userReset, userSendActivationEmail } from 'actions/user';
import userPostSchema from 'validation_schema/user-post.json';
import * as jsonSchema from 'utility/json-schema';


const ActivateForm = React.createClass({
    propTypes: {
        activationUser: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            changedFields: {},
            model: undefined
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.id==undefined) {
            this.setState({
                 ... this.state,
                 model: undefined,
                 changedFields: {}
            });
        } else if(nextProps.model!==undefined) {
            this.setState({
                 ... this.state,
                 model: nextProps.model,
                 changedFields: {}
            });
        }
    },
    handleFieldChange(e, payload) {
        const { changedFields } = this.state;
        changedFields[payload.name] = payload.value;
        this.setState({
            ... this.state,
            changedFields
        });
    },
    onClickSubmit(e) {
        e.preventDefault();
        const { id, dispatch } = this.props;
        const { changedFields } = this.state;
        // if (id) {
        //     dispatch(userPut(id, changedFields));
        // } else {
        //     dispatch(userPost(changedFields));
        // }
        console.log('submit!');
    },
    render() {
        const { handleFieldChange, handleClickSendActivationEmail } = this;
        const { activationUser, ui_state, errors } = this.props;
        const { changedFields, model } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, userPostSchema);
        console.log(activationUser);
        console.log(model);
        return (
            <Container text={ true }>
                <Form
                    size="large"
                    loading={ ui_state == UI_STATE.REQUESTING }
                    error={ ui_state == UI_STATE.ERROR }
                    success={ ui_state == UI_STATE.SUCCESS }
                    onSubmit={ this.onClickSubmit }
                >
                    <Container>
                        <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                    </Container>

                    <Form.Input label="Password" placeholder="Password" name="password" type="password" onChange={ handleFieldChange } value={ inputFields.password || '' } required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('password', errors)} />

                    <Form.Input label="Password Repeat" placeholder="Password Repeat" name="password_repeat" type="password_repeat" onChange={ handleFieldChange } value={ inputFields.password_repeat || '' } required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('password_repeat', errors)} />

                    <Form.Field>
                        <Button as="a" color="green" onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 }><Icon name="save" /> Activate</Button>
                    </Form.Field>

                </Form>
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.userReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(ActivateForm);
