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
import { projectGet, projectPut, projectPost, projectReset } from 'actions/project';
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

                    <Form.Input label="Title" placeholder="Title" name="title" type="text" onChange={ handleFieldChange } value={ inputFields.title || '' } required={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('title', errors)} />

                    <Image shape="rounded" size="large" centered={ true } src={ inputFields.header_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                    <Form.Input label="Header Image URL" placeholder="https://image.com/image.jpg" name="header_image_url" type="text" onChange={ handleFieldChange } value={ inputFields.header_image_url || '' } icon='image' iconPosition='left' />
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('header_image_url', errors)} />

                    <Form.TextArea label="Logline" placeholder="Logline" name="logline" onChange={ handleFieldChange } value={ inputFields.logline || '' } autoHeight={ true }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('logline', errors)} />

                    <Form.Field label="Genres" placeholder="Genres" name="subgenres" control={ ProjectSubgenreInput }  subgenres={ inputFields.subgenres || [] } onChange={ handleFieldChange }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('tags', errors)} />

                    <Form.Field label="Tags" placeholder="Tags" name="tags" control={ TagEditor }  tagsArrayAsJson={ inputFields.tags || '' } onChange={ handleFieldChange }/>
                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('tags', errors)} />

                    <Form.Group>
                        <Form.Field>
                            <label>Format</label>
                        </Form.Field>

                        <Form.Field>
                            <Checkbox
                                radio
                                label='Live Action'
                                name='format'
                                id='format-live_action'
                                value='live_action'
                                checked={ inputFields.format === 'live_action'}
                                onChange={ handleFieldChange }
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='Animated'
                                name='format'
                                id='format-animated'
                                value='animated'
                                checked={ inputFields.format === 'animated'}
                                onChange={ handleFieldChange }
                            />
                        </Form.Field>
                    </Form.Group>

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
