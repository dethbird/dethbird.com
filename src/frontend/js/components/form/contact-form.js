import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Form,
    Icon,
    Image,
    Label,
    Menu,
    Message,
    Segment
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import { UI_STATE } from 'constants/ui-state';
import { contactPost } from 'actions/contact';
import contactPostSchema from 'validation_schema/contact-post.json';
import * as jsonSchema from 'utility/json-schema';


const ContactForm = React.createClass({
    getInitialState() {
        return {
            changedFields: {},
            model: undefined
        }
    },
    handleFieldChange(e, payload) {
        const { changedFields } = this.state;
        if (payload.type=="checkbox") {
            changedFields[payload.id] = payload.checked;
        } else {
            changedFields[payload.id] = payload.value;
        }
        this.setState({
            ... this.state,
            changedFields
        });
    },
    onClickSubmit() {
        const { id, dispatch } = this.props;
        const { changedFields } = this.state;
        dispatch(contactPost(changedFields));
    },
    render() {
        const { handleFieldChange } = this;
        const { id, ui_state, errors, model } = this.props;
        const { changedFields } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, contactPostSchema);

        if (ui_state == UI_STATE.SUCCESS) {
            return (
                <Segment as={ Container } text>
                    <Message positive>
                        <Message.Header>Success!</Message.Header>
                        <p>Your message has been sent successfully.</p>
                    </Message>
                    <Container textAlign='center'><p>We'll get back to you ASAP!</p></Container>
                </Segment>
            )
        }

        return (
            <Segment as={ Container } text>
                <Form
                    size="large"
                    loading={ ui_state == UI_STATE.REQUESTING }
                    error={ ui_state == UI_STATE.ERROR }
                    success={ ui_state == UI_STATE.SUCCESS }
                >
                    <Container>
                        <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                    </Container>

                    <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ handleFieldChange } required/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('name', errors)} />

                    <Form.Input label="Email" placeholder="Email" id="email" type="email" onChange={ handleFieldChange } required/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('email', errors)} />

                    <Form.Input label="Organization" placeholder="Organization" id="organization" type="organization" onChange={ handleFieldChange } />
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('organization', errors)} />

                    <Form.TextArea label="Message" placeholder="Message" id="message" onChange={ handleFieldChange } autoHeight={ true } required/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('message', errors)} />

                    <Container textAlign="right">
                        <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 } labelPosition="right" icon="send" content="Send" />
                    </Container>
                </Form>
            </Segment>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.contactReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(ContactForm);
