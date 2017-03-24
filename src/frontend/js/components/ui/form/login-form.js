import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Form,
    Menu
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/actions';
import { loginAttempt } from 'actions/login';
import loginPostSchema from 'validation_schema/login-post.json';
import * as jsonSchema from 'utility/json-schema';

const LoginForm = React.createClass({
    getInitialState() {
        return {
            changedFields: jsonSchema.initialFields(loginPostSchema)
        }
    },
    handleFieldChange(e, elementId) {
        const { changedFields } = this.state;
        changedFields[elementId] = e.currentTarget.value;
        this.setState({
            ... changedFields
        });
    },
    onClickSubmit() {
        const { dispatch } = this.props;
        const { changedFields } = this.state;
        dispatch(loginAttempt(changedFields));
    },
    propTypes: {
        onClickCancel: React.PropTypes.func.isRequired
    },
    render() {
        const { onClickCancel, ui_state, errors } = this.props;
        const { changedFields } = this.state;
        console.log(ui_state);
        return (
            <Container text={ true }>
                <Form inverted={ true }>
                    <Form.Group widths='equal'>
                        <Form.Input label="Username" placeholder="Username" id="username" type="text" onChange={ (e) => this.handleFieldChange(e, 'username') } value={ changedFields.username || '' }></Form.Input>
                        <Form.Input label="Password" placeholder="Password" id="password" type="password"  onChange={ (e) => this.handleFieldChange(e, 'password') } value={ changedFields.password || '' }></Form.Input>
                    </Form.Group>
                    <Container textAlign="right">
                        <Button.Group>
                            <Button as="a" color="teal" onClick={ this.onClickSubmit }>Login</Button>
                            <Button as="a" onClick={ onClickCancel }>Cancel</Button>
                        </Button.Group>
                    </Container>
                </Form>
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors } = state.loginReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors
    }
}

export default connect(mapStateToProps)(LoginForm);
