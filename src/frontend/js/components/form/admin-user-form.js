import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Checkbox,
    Container,
    Form,
    Icon,
    Image,
    Label,
    Menu,
    Message
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import { UI_STATE } from 'constants/ui-state';
import { userGet, userPut, userPost, userReset, userSendActivationEmail } from 'actions/user';
import userPostSchema from 'validation_schema/user-post.json';
import * as jsonSchema from 'utility/json-schema';


const AdminUserForm = React.createClass({
    propTypes: {
        id: React.PropTypes.string
    },
    getInitialState() {
        return {
            changedFields: {},
            model: undefined
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { id } = this.props;

        if (id) {
            dispatch(userGet(id));
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.id==undefined) {
            this.setState({
                 ... this.state,
                 model: undefined,
                 changedFields: {}
            });
        } else if(nextProps.model!==undefined) {
            this.setState({
                 ... this.state,
                 model: nextProps.model,
                 changedFields: {}
            });
        }
    },
    handleFieldChange(e, payload) {
        const { changedFields } = this.state;
        changedFields[payload.name] = payload.value;
        this.setState({
            ... this.state,
            changedFields
        });
    },
    handleClickSendActivationEmail() {
        const { id, dispatch } = this.props;
        dispatch(userSendActivationEmail(id));
    },
    onClickSubmit(e) {
        e.preventDefault();
        const { id, dispatch } = this.props;
        const { changedFields } = this.state;
        if (id) {
            dispatch(userPut(id, changedFields));
        } else {
            dispatch(userPost(changedFields));
        }
    },
    render() {
        const { handleFieldChange, handleClickSendActivationEmail } = this;
        const { id, ui_state, errors } = this.props;
        const { changedFields, model } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, userPostSchema);

        return (
            <Container text={ true }>
                <Form
                    size="large"
                    loading={ ui_state == UI_STATE.REQUESTING }
                    error={ ui_state == UI_STATE.ERROR }
                    success={ ui_state == UI_STATE.SUCCESS }
                    onSubmit={ this.onClickSubmit }
                >
                    <Container>
                        <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                    </Container>

                    <Form.Input label="Username" placeholder="Username" name="username" type="text" onChange={ handleFieldChange } value={ inputFields.username || '' } required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('username', errors)} />

                    <Form.Input label="Email" placeholder="joeschmoe@joeschmoestudios.com" id="email" type="email" onChange={ handleFieldChange } value={ inputFields.email || '' }  required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('email', errors)} />

                    <Form.Input label="Name" placeholder="Name" name="name" type="text" onChange={ handleFieldChange } value={ inputFields.name || '' } />
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('name', errors)} />

                    <Image shape="rounded" size="large" centered={ true } src={ inputFields.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                    <Form.Input label="Avatar Image URL" placeholder="https://image.com/image.jpg" name="avatar_image_url" type="text" onChange={ handleFieldChange } value={ inputFields.avatar_image_url || '' } icon='image' iconPosition='left' />
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('avatar_image_url', errors)} />

                    <Form.Field>
                        <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 }><Icon name="save" /> { id ? "Save" : "Create" }</Button>
                        <Button as="a" onClick={ handleClickSendActivationEmail }>Send Activation Email</Button>
                    </Form.Field>

                </Form>
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.userReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(AdminUserForm);
