import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

import { buttonStyle } from '../../constants/styles'

const ButtonsForm = React.createClass({

    propTypes: {
        handleClickCancel: React.PropTypes.func.isRequired,
        handleClickSubmit: React.PropTypes.func.isRequired
    },

    render: function() {
        const { handleClickCancel, handleClickSubmit } = this.props;

        return (
            <div>
                <RaisedButton
                    label="Cancel"
                    onClick={ handleClickCancel }
                    style={ buttonStyle }
                />
                <RaisedButton
                    label="Save"
                    onClick={ handleClickSubmit }
                    primary={ true }
                    style={ buttonStyle }
                />
            </div>
        );
    }
})

module.exports.ButtonsForm = ButtonsForm
