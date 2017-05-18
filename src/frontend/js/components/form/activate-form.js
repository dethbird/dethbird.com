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
import { userActivate } from 'actions/user';
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
        const { activationUser, id, dispatch } = this.props;
        const { changedFields } = this.state;

        dispatch(userActivate({
            ... changedFields,
            token: activationUser.verify_token_activation
        }));
    },
    render() {
        const { handleFieldChange, onClickSubmit } = this;
        const { activationUser, ui_state, errors } = this.props;
        const { changedFields, model } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, userPostSchema);

        if (!activationUser.username)
            return (
                <div>
                    <Container text>
                        <Message negative>
                            <Message.Header>Error.</Message.Header>
                            <p>User not found, or perhaps already activated.</p>
                        </Message>
                    </Container>
                </div>
            );

        if (ui_state == UI_STATE.SUCCESS)
            return (
                <div>
                    <Container text>
                        <Message positive>
                            <Message.Header>Success!</Message.Header>
                            <p>Your account has been activated successfully</p>
                        </Message>
                    </Container>
                    <br />
                    <Container text>
                        <p>Welcome to StoryStation, <strong>{ activationUser.username }</strong>! Now seems like a good time to create a story:</p>
                        <Button as="a" color="blue" href='/story/create' size='huge' icon='arrow right' labelPosition='right' content='Go!' />
                    </Container>
                </div>
            );

        return (
            <Container text={ true }>
                <Form
                    size="large"
                    loading={ ui_state == UI_STATE.REQUESTING }
                    error={ ui_state == UI_STATE.ERROR }
                    success={ ui_state == UI_STATE.SUCCESS }
                    onSubmit={ onClickSubmit }
                >
                    <Container>
                        Please choose a password to complete your account activation, <strong>{ activationUser.username }</strong>. You are moments away from writing the screenplay of your lifetime.
                    </Container>
                    <br />
                    <Container>
                        <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                    </Container>

                    <Form.Input label="Password" placeholder="Password" name="password" type="password" onChange={ handleFieldChange } value={ inputFields.password || '' } required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('password', errors)} />

                    <Form.Input label="Password Repeat" placeholder="Password Repeat" name="password_repeat" type="password" onChange={ handleFieldChange } value={ inputFields.password_repeat || '' } required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('password_repeat', errors)} />

                    <Form.Field>
                        <Button as="a" color="green" onClick={ onClickSubmit } disabled={ Object.keys(changedFields).length===0 } icon='checkmark' labelPosition='right' content='Activate' />
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
