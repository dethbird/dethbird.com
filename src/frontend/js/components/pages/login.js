import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_SUCCESS,
} from '../../constants/ui-state';

import UiState from '../ui/ui-state'

import { loginAttempt } from  '../../actions/login'


const Login = React.createClass({
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui_state==UI_STATE_SUCCESS)
            window.location.href = '/projects';
    },
    getInitialState() {
        return ({
            changedFields: {}
        });
    },
    handleFieldChange(event) {
        let changedFields = this.state.changedFields;

        changedFields[event.target.id] = event.target.value

        this.setState({
            changedFields: changedFields
        })
    },
    handleClickSubmit(event) {
        event.preventDefault();

        const { dispatch } = this.props;
        const { changedFields } = this.state;

        dispatch(loginAttempt(
            changedFields.username,
            changedFields.password
        ));
    },
    render() {
        const { ui_state } = this.props;

        return (
            <div>
                <UiState state={ ui_state } />
                <h1>Sign in, Honcho</h1>
                <TextField
                    hintText="Username"
                    floatingLabelText="Enter your username"
                    floatingLabelFixed={ true }
                    id='username'
                    value={ this.state.changedFields.username || '' }
                    onChange= { this.handleFieldChange }
                />
                <br />
                <TextField
                    hintText="Password"
                    floatingLabelText="Enter your password"
                    floatingLabelFixed={ true }
                    id='password'
                    type="password"
                    value={ this.state.changedFields.password || '' }
                    onChange= { this.handleFieldChange }
                />
                <br />
                <RaisedButton
                    primary={true}
                    label="Login"
                    onTouchTap={ this.handleClickSubmit }
                    disabled={ !this.state.changedFields }
                />
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        ui_state: state.login.ui_state
    }
}

export default connect(mapStateToProps)(Login);
