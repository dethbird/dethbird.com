import classNames from 'classnames';
import React from 'react'
import request from 'superagent';

import InputText from './form/input-text';

import {
    UI_STATE_INITIALIZING,
    UI_STATE_REQUESTING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

const SecurityContext = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        securityContext: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            showLoginForm: false,
            changedFields: {},
            uiState: UI_STATE_COMPLETE
        }
    },

    handleClickLogin: function() {
        this.setState( {
            ... this.state,
            showLoginForm: true
        });
    },

    handleCancelLogin: function() {
        this.setState( {
            ... this.state,
            showLoginForm: false
        });
    },


    handleSubmitLogin: function() {
        const { changedFields } = this.state;
        const that = this;

        that.setState( {
            uiState: UI_STATE_REQUESTING
        });

        request.post('/api/authorize')
            .send( changedFields )
            .end(function(err, res){
                that.setState( {
                    changedFields: {},
                    uiState: UI_STATE_COMPLETE
                });

                if(res.ok) {
                    location.reload();
                } else {
                    console.log(res);
                }
        });
    },

    handleFieldChange(event) {
        const { changedFields } = this.state;
        let newChangedFields = changedFields;
        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
    },

    render: function() {
        const { className, securityContext } = this.props;
        const { showLoginForm, changedFields, uiState } = this.state;
        if(securityContext.application_user===1){
            if (showLoginForm) {
                return (
                    <div className="box">
                        <form>
                            <InputText
                                label="username"
                                id="username"
                                value={ changedFields.username || '' }
                                onChange= { this.handleFieldChange }
                            />
                            <InputText
                                label="password"
                                id="password"
                                value={ changedFields.password || '' }
                                onChange= { this.handleFieldChange }
                                password={ true }
                            />
                            <div className="control is-grouped">
                                <p className="control">
                                    <a
                                        className="button is-light"
                                        onClick={ this.handleCancelLogin }
                                    >Cancel</a>
                                </p>
                                <p className="control">
                                    <a
                                        className={ classNames(['button is-primary', uiState==UI_STATE_REQUESTING ? 'is-loading': null ]) }
                                        onClick={ this.handleSubmitLogin }
                                    >Login</a>
                                </p>
                            </div>

                        </form>
                    </div>
                );
            } else {
                return (
                    <div className={ classNames([className, 'securty-context']) }>
                        <a
                            className="button is-info"
                            onClick={ this.handleClickLogin }
                        >Login</a>
                    </div>
                );
            }
        } else {
            return (
                <div className={ classNames([className, 'securty-context control is-grouped']) }>
                    <p className="control">
                        <span className="tag is-dark">{ securityContext.username }</span>
                    </p>
                    <p className="control">
                        <a
                            className="button is-light"
                            onClick={ this.handleClickLogout }
                        >Logout</a>
                    </p>
                </div>
            );
        }
    }
})

export default SecurityContext;
