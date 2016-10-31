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

import { Alert } from '../ui/alert'
import { SectionHeader } from '../ui/section-header'
import { Spinner } from '../ui/spinner'
import { loginAttempt } from  '../../actions/login'


const Login = React.createClass({
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui_state==UI_STATE_SUCCESS)
            document.location = '/projects';
    },
    getInitialState() {
        return ({
            model: {},
            formState: null,
            formMessage: null,
            changedFields: {}
        });
    },
    handleFieldChange(event) {
        let model = this.state.model;
        let changedFields = this.state.changedFields;

        model[event.target.id] = event.target.value
        changedFields[event.target.id] = event.target.value

        this.setState({
            model: model,
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
        let that = this;
        if (this.state){
            return (
                <div>
                    <h1>Sign in, Honcho</h1>
                    <TextField
                        hintText="Username"
                        floatingLabelText="Enter your username"
                        floatingLabelFixed={ true }
                        id='username'
                        value={ this.state.model.username || '' }
                        onChange= { this.handleFieldChange }
                    />
                    <br />
                    <TextField
                        hintText="Password"
                        floatingLabelText="Enter your password"
                        floatingLabelFixed={ true }
                        id='password'
                        type="password"
                        value={ this.state.model.password || '' }
                        onChange= { this.handleFieldChange }
                    />
                    <br />
                    <RaisedButton
                        primary={true}
                        label="Login"
                        onTouchTap={ that.handleClickSubmit }
                        disabled={ !that.state.changedFields }
                    />
                </div>
            );
        }
        return (
            <Spinner />
        )
    }
});

const mapStateToProps = (state) => {
    return {
        ui_state: state.login.ui_state
    }
}

export default connect(mapStateToProps)(Login);
