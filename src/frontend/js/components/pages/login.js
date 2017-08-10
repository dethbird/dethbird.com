import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { ActionHttps } from 'material-ui/svg-icons';

import Container from 'components/layout/container';
import FormWrapper from 'components/form/form-wrapper';
import UiStateButton from 'components/form/ui-state-button';
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
            <Container>
                <FormWrapper onSubmit={ this.onClickSubmit } >
                    <Card>
                        <CardTitle title="Login, Honcho" />
                        <CardText>
                            <TextField 
                                type='username'
                                floatingLabelText='Username'
                                name='username'
                                id='username'
                                fullWidth
                                value={changedFields.username || ''}
                                onChange={this.handleFieldChange}
                                errorText={jsonSchema.getErrorMessageForProperty('username', errors)}
                                hintText='joe.schmoe'
                            />
                            <br />
                            <TextField
                                type='password'
                                floatingLabelText='Password'
                                name='password'
                                id='password'
                                fullWidth
                                value={changedFields.password || ''}
                                onChange={this.handleFieldChange}
                                errorText={jsonSchema.getErrorMessageForProperty('password', errors)}
                                hintText='letmein'
                            />
                        </CardText>
                        <CardActions style={ { textAlign: 'right' } }>
                            <UiStateButton uiState={ ui_state } successMessage={ 'Login successful' } >
                                <FlatButton icon={<ActionHttps /> } label='Login' labelPosition='before' primary onClick={ this.onClickSubmit } type='submit'/>
                            </UiStateButton>
                        </CardActions>
                    </Card>
                </FormWrapper>
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
