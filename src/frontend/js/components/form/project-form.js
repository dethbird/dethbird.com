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
import { UI_STATE } from 'constants/ui-state';
import { projectGet, projectPut, projectPost } from 'actions/project';
import projectPostSchema from 'validation_schema/project-post.json';
import * as jsonSchema from 'utility/json-schema';

import TagEditor from 'components/ui/form/tag-editor';
import ProjectSubgenreInput from 'components/ui/form/input/project-subgenre-input';


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
    handleFieldChange(e, payload) {
        const { changedFields } = this.state;
        if (payload.type=="checkbox") {
            changedFields[payload.id] = payload.checked;
        } else {
            changedFields[payload.id] = payload.value;
        }
        this.setState({
            ... this.state,
            changedFields
        });
    },
    onClickSubmit(e) {
        e.preventDefault();
        const { id, dispatch } = this.props;
        const { changedFields } = this.state;
        if (id) {
            dispatch(projectPut(id, changedFields));
        } else {
            dispatch(projectPost(changedFields));
        }
    },
    render() {
        const { handleFieldChange } = this;
        const { id, ui_state, errors } = this.props;
        const { changedFields, model } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, projectPostSchema);

        console.log(inputFields);
        console.log(model);
        console.log(changedFields);

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

                    <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ handleFieldChange } value={ inputFields.name || '' } required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('name', errors)} />

                    <Image shape="rounded" size="large" centered={ true } src={ inputFields.header_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                    <Form.Input label="Header Image URL" placeholder="https://image.com/image.jpg" id="header_image_url" type="text" onChange={ handleFieldChange } value={ inputFields.header_image_url || '' } icon='image' iconPosition='left' />
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('header_image_url', errors)} />

                    <Form.TextArea label="Description" placeholder="Description" id="description" onChange={ handleFieldChange } value={ inputFields.description || '' } autoHeight={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('description', errors)} />

                    <Form.Field label="Genres" placeholder="Genres" id="subgenres" control={ ProjectSubgenreInput }  subgenres={ inputFields.subgenres || [] } onChange={ handleFieldChange }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('tags', errors)} />

                    <Form.Field label="Tags" placeholder="Tags" id="tags" control={ TagEditor }  tagsArrayAsJson={ inputFields.tags || '' } onChange={ handleFieldChange }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('tags', errors)} />

                    <Form.Field>
                        <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 }><Icon name="save" /> { id ? "Save" : "Create" }</Button>
                    </Form.Field>

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
