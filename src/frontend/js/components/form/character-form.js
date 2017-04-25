import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Form,
    Icon,
    Image,
    Label,
    Menu,
    Message
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import TagEditor from 'components/ui/form/tag-editor';
import { UI_STATE } from 'constants/ui-state';
import { characterGet, characterPut, characterPost } from 'actions/character';
import characterPostSchema from 'validation_schema/character-post.json';
import * as jsonSchema from 'utility/json-schema';


const CharacterForm = React.createClass({
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
            dispatch(characterGet(id));
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.model!==undefined) {
            this.setState({
                 ... this.state,
                 model: nextProps.model,
                 changedFields: {}
            });
        }
    },
    handleFieldChange(e, elementId) {
        const { changedFields } = this.state;
        changedFields[elementId] = e.currentTarget.value;
        this.setState({
            ... this.state,
            changedFields
        });
    },
    onClickSubmit() {
        const { id, dispatch } = this.props;
        const { changedFields } = this.state;
        if (id) {
            dispatch(characterPut(id, changedFields));
        } else {
            dispatch(characterPost(changedFields));
        }
    },
    render() {
        const { id, ui_state, errors } = this.props;
        const { changedFields, model } = this.state;
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

                    <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ (e) => this.handleFieldChange(e, 'name') } value={ inputFields.name || '' } required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('name', errors)} />

                    <Image shape="circular" size="large" centered={ true } src={ inputFields.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                    <Form.Input label="Avatar Image URL" placeholder="https://image.com/image.jpg" id="avatar_image_url" type="text" onChange={ (e) => this.handleFieldChange(e, 'avatar_image_url') } value={ inputFields.avatar_image_url || '' } icon='image' iconPosition='left' />
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('avatar_image_url', errors)} />

                    <Form.Group>
                        <Form.Input label="Occupation" placeholder="Occupation" id="occupation" type="text" onChange={ (e) => this.handleFieldChange(e, 'occupation') } value={ inputFields.occupation || '' } width={ 8 } />
                        <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('occupation', errors)} />
                        <Form.Input label="Gender" placeholder="Gender" id="gender" type="text" onChange={ (e) => this.handleFieldChange(e, 'gender') } value={ inputFields.gender || '' }  width={ 8 } />
                        <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('gender', errors)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Input label="Age" placeholder="Age" id="age" type="text" onChange={ (e) => this.handleFieldChange(e, 'age') } value={ inputFields.age || '' } width={ 3 } />
                        <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('age', errors)} />

                        <Form.Input label="Location" placeholder="Location" id="location" type="text" onChange={ (e) => this.handleFieldChange(e, 'location') } value={ inputFields.location || '' } width={ 13 } icon='location arrow' iconPosition='left' />
                        <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('location', errors)} />
                    </Form.Group>

                    <Form.TextArea label="Description" placeholder="Description" id="description" onChange={ (e) => this.handleFieldChange(e, 'description') } value={ inputFields.description || '' } autoHeight={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('description', errors)} />

                    <Form.Field label="Tags" placeholder="Tags" id="tags" control={ TagEditor }  tagsArrayAsJson={ inputFields.tags || '' } onChange={ this.handleFieldChange }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('tags', errors)} />

                    <Container textAlign="right">
                        <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 }><Icon name="save" /> { id ? "Save" : "Create" }</Button>
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
