import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import {
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_SUCCESS,
} from '../../constants/ui-state';

import { Alert } from '../ui/alert'
import { Card } from '../ui/card'
import { CardBlock } from '../ui/card-block'
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
                    <Alert
                        status={ this.state.formState }
                        message={ this.state.formMessage }
                    />
                    <form>
                        <h1>Sign In, Honcho</h1>
                        <SectionHeader>username:</SectionHeader>
                        <div className='form-group'>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                placeholder='Username'
                                value={ this.state.model.username || '' }
                                onChange= { this.handleFieldChange }
                            />
                        </div>

                        <SectionHeader>password:</SectionHeader>
                        <div className='form-group'>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                rows='3'
                                value={ this.state.model.password || '' }
                                onChange= { this.handleFieldChange }
                            />
                        </div>

                        <div className='form-group text-align-center'>
                            <button
                                className='btn btn-success'
                                onClick={ that.handleClickSubmit }
                                disabled={ !that.state.changedFields }
                            >Login</button>
                        </div>


                    </form>
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
