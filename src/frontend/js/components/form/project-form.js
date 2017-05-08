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
import { projectGet, projectPut, projectPost } from 'actions/project';
import projectPostSchema from 'validation_schema/project-post.json';
import * as jsonSchema from 'utility/json-schema';


const ProjectForm = React.createClass({
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
            dispatch(projectGet(id));
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
            dispatch(projectPut(id, changedFields));
        } else {
            dispatch(projectPost(changedFields));
        }
    },
    render() {
        const { id, ui_state, errors } = this.props;
        const { changedFields, model } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, projectPostSchema);
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

                    <Image shape="rounded" size="large" centered={ true } src={ inputFields.avatar_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                    <Form.Input label="Header Image URL" placeholder="https://image.com/image.jpg" id="avatar_image_url" type="text" onChange={ (e) => this.handleFieldChange(e, 'avatar_image_url') } value={ inputFields.avatar_image_url || '' } icon='image' iconPosition='left' />
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('avatar_image_url', errors)} />

                    <Form.TextArea label="Description" placeholder="Description" id="description" onChange={ (e) => this.handleFieldChange(e, 'description') } value={ inputFields.description || '' } autoHeight={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('description', errors)} />

                    <Form.Field label="Genres" placeholder="Genres" control={ TagEditor } onChange={ this.handleFieldChange }/>

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
    const { ui_state, errors, model } = state.projectReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(ProjectForm);
