import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Container,
    Form,
    Menu,
    Message
} from 'semantic-ui-react';

import ErrorMessage from 'components/message/error-message';

import { UI_STATE } from 'constants/ui-state';
import { loginAttempt } from 'actions/login';
import loginPostSchema from 'validation_schema/login-post.json';
import * as jsonSchema from 'utility/json-schema';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedFields: jsonSchema.initialFields(loginPostSchema)
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }
    handleFieldChange(e, elementId) {
        const { changedFields } = this.state;
        changedFields[e.currentTarget.id] = e.currentTarget.value;
        this.setState({
            ...changedFields
        });
    }
    onClickSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { changedFields } = this.state;
        dispatch(loginAttempt(changedFields));
    }
    render() {
        const { ui_state, errors } = this.props;
        const { changedFields } = this.state;
        return (
            <Container text={true}>
                <Form
                    inverted={true}
                    loading={ui_state == UI_STATE.REQUESTING}
                    error={ui_state == UI_STATE.ERROR}
                    success={ui_state == UI_STATE.SUCCESS}
                    onSubmit={this.onClickSubmit}
                >
                    <Container>
                        <Message success={true} content="Successfully logged in, redirecting ..." />
                        <ErrorMessage message={jsonSchema.getGlobalErrorMessage(errors)} />
                    </Container>
                    <Form.Group widths='equal'>
                        <Form.Input label="Username" placeholder="Username" id="username" type="text" onChange={(e) => this.handleFieldChange(e, 'username')} value={changedFields.username || ''} />
                        <ErrorMessage message={jsonSchema.getErrorMessageForProperty('username', errors)} />
                        <Form.Input label="Password" placeholder="Password" id="password" type="password" onChange={(e) => this.handleFieldChange(e, 'password')} value={changedFields.password || ''} />
                        <ErrorMessage message={jsonSchema.getErrorMessageForProperty('password', errors)} />
                    </Form.Group>
                    <Container textAlign="right">
                        <Button.Group>
                            <Button color="teal" onClick={this.onClickSubmit}>Login</Button>
                        </Button.Group>
                    </Container>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const { ui_state, errors } = state.loginReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors
    }
}

export default connect(mapStateToProps)(Login);
