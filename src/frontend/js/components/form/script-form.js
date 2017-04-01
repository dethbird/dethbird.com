import React from 'react';
import { connect } from 'react-redux';
import {
    Accordion,
    Button,
    Container,
    Form,
    Icon,
    Image,
    Label,
    Message,
    Segment,
    Sidebar
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import ScriptInput from 'components/ui/form/script-input';
import SidebarFountainHelp from 'components/ui/sidebar/sidebar-fountain-help';
import { UI_STATE } from 'constants/ui-state';
import { scriptGet, scriptPut, scriptPost } from 'actions/script';
import scriptPostSchema from 'validation_schema/script-post.json';
import * as jsonSchema from 'utility/json-schema';


const ScriptForm = React.createClass({
    propTypes: {
        id: React.PropTypes.string
    },
    getInitialState() {
        return {
            changedFields: {},
            model: undefined,
            sidebarVisible: false
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { id } = this.props;
        if (id) {
            dispatch(scriptGet(id));
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
    handleClickSnippetInsert(e, snippet) {
        const { changedFields, model } = this.state;
        changedFields['script'] = changedFields['script']
            ? changedFields['script'] + '\n\n' + snippet
            : model.script + '\n\n' + snippet;
        this.setState({
            ... this.state,
            changedFields
        });

    },
    onClickSubmit() {
        const { id, dispatch } = this.props;
        const { changedFields } = this.state;
        if (id) {
            dispatch(scriptPut(id, changedFields));
        } else {
            dispatch(scriptPost(changedFields));
        }
    },
    toggleSidebarVisibility() {
        this.setState({ ... this.state, sidebarVisible: !this.state.sidebarVisible });
    },
    render() {
        const { id, ui_state, errors } = this.props;
        const { changedFields, model, sidebarVisible } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, scriptPostSchema);

        return (
            <div>
                <Container textAlign="left" fluid>
                    <Button onClick={ this.toggleSidebarVisibility }>{ sidebarVisible ? "<" : "Script Help" }</Button>
                </Container>
                <br />
                <Sidebar.Pushable>
                    <Sidebar as={Segment} animation='push' width='very wide'  direction='left' visible={ sidebarVisible } inverted>
                        <SidebarFountainHelp onClickSnippetInsert={ this.handleClickSnippetInsert } />
                    </Sidebar>
                    <Sidebar.Pusher dimmed={ sidebarVisible }>
                        <Form
                            size="large"
                            loading={ ui_state == UI_STATE.REQUESTING }
                            error={ ui_state == UI_STATE.ERROR }
                            success={ ui_state == UI_STATE.SUCCESS }
                        >
                            <Container text={ true }>
                                <Container>
                                    <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                                </Container>
                                <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ (e) => this.handleFieldChange(e, 'name') } value={ inputFields.name || '' } required={ true }/>
                                <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('name', errors)} />

                                <Form.TextArea label="Description" placeholder="Description" id="description" onChange={ (e) => this.handleFieldChange(e, 'description') } value={ inputFields.description || '' } autoHeight={ true }/>
                                <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('description', errors)} />

                            </Container>

                            <Container>
                                <Form.Field label="Script" placeholder="Script" id="script" control={ ScriptInput }  script={ inputFields.script || '' } onChange={ this.handleFieldChange }/>
                                <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('script', errors)} />
                            </Container>
                            <br />
                            <Container text={ true } textAlign="right">
                                    <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 } size="large">{ id ? "Save" : "Create" }</Button>
                            </Container>
                        </Form>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.scriptReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(ScriptForm);
