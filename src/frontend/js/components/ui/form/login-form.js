import React from 'react';
import {
    Button,
    Container,
    Form,
    Menu
} from 'semantic-ui-react';

import loginPostSchema from 'validation_schema/login-post.json';
import * as jsonSchema from 'utility/json-schema';

const LoginForm = React.createClass({
    getInitialState() {
        return {
            changedFields: jsonSchema.initialFields(loginPostSchema)
        }
    },
    propTypes: {
        onClickCancel: React.PropTypes.func.isRequired
    },
    render() {
        const { onClickCancel } = this.props;

        return (
            <Container text={ true }>
                <Form inverted={ true }>
                    <Form.Group widths='equal'>
                        <Form.Input label="Username" placeholder="Username" type="text"></Form.Input>
                        <Form.Input label="Password" placeholder="Password" type="password"></Form.Input>
                    </Form.Group>
                    <Container textAlign="right">
                        <Button.Group>
                            <Button as="a" color="teal">Login</Button>
                            <Button as="a" onClick={ onClickCancel }>Cancel</Button>
                        </Button.Group>
                    </Container>
                </Form>
            </Container>
        )
    }
})

export default LoginForm;
