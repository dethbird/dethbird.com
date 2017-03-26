import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Form,
    Image,
    Label,
    Menu,
    Message
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import { UI_STATE } from 'constants/ui-state';
import { characterGet } from 'actions/character';
import characterPostSchema from 'validation_schema/character-post.json';
import * as jsonSchema from 'utility/json-schema';


const CharacterForm = React.createClass({
    propTypes: {
        id: React.PropTypes.string
    },
    getInitialState() {
        return {
            changedFields: {}
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { id } = this.props;
        if (id) {
            dispatch(characterGet(id));
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
    render() {
        const { id, ui_state, errors, model } = this.props;
        const { changedFields } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, characterPostSchema);
        return (
            <Container text={ true }>
                <Form
                    size="large"
                    loading={ ui_state == UI_STATE.REQUESTING }
                    error={ ui_state == UI_STATE.ERROR }
                    success={ ui_state == UI_STATE.SUCCESS }
                >
                    <Container>
                        <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                    </Container>
                    <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ (e) => this.handleFieldChange(e, 'name') } value={ inputFields.name || '' } />
                    <Image shape="circular" size="large" centered={ true } src={ inputFields.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                    <Form.Input label="Avatar Image URL" placeholder="https://image.com/image.jpg" id="avatar_image_url" type="text" onChange={ (e) => this.handleFieldChange(e, 'avatar_image_url') } value={ inputFields.avatar_image_url || '' } icon='image' iconPosition='left' />
                    <Form.Input label="Occupation" placeholder="Occupation" id="occupation" type="text" onChange={ (e) => this.handleFieldChange(e, 'occupation') } value={ inputFields.occupation || '' } />
                    <Form.Group>
                        <Form.Input label="Age" placeholder="Age" id="age" type="text" onChange={ (e) => this.handleFieldChange(e, 'age') } value={ inputFields.age || '' } width={ 3 } />
                        <Form.Input label="Location" placeholder="Location" id="location" type="text" onChange={ (e) => this.handleFieldChange(e, 'location') } value={ inputFields.location || '' } width={ 13 } icon='location arrow' iconPosition='left' />
                    </Form.Group>
                    <Form.TextArea label="Description" placeholder="Description" id="description" onChange={ (e) => this.handleFieldChange(e, 'description') } value={ inputFields.description || '' } autoHeight={ true }/>
                    <Form.Input label="Tags" placeholder="Tags" id="tags" type="text" onChange={ (e) => this.handleFieldChange(e, 'tags') } value={ inputFields.tags || '' } />
                    <Container textAlign="right">
                        <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 }>{ id ? "Save" : "Create" }</Button>
                    </Container>
                </Form>
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.characterReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(CharacterForm);
