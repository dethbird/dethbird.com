import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Form,
    Grid,
    Icon,
    Image,
    Label,
    Message,
    Segment
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import ScriptInput from 'components/ui/form/script-input';
import ScriptCastList from 'components/ui/list/script-cast-list';
import StoryProject from 'components/ui/form/story-project';
import SidebarFountainHelp from 'components/ui/sidebar/sidebar-fountain-help';
import { UI_STATE } from 'constants/ui-state';
import { storyGet, storyGetDemo, storyPut, storyPutDemo, storyPost } from 'actions/story';
import storyPostSchema from 'validation_schema/story-post.json';
import * as jsonSchema from 'utility/json-schema';
import { tokenizeScript } from 'utility/script-utils';


const StoryForm = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        demo: React.PropTypes.bool
    },
    getInitialState() {
        return {
            changedFields: {},
            model: undefined,
            currentLine: undefined
        }
    },
    componentWillMount() {
        const { id, demo, dispatch } = this.props;
        if (demo===true) {
            dispatch(storyGetDemo());
        } else {
            if (id) {
                dispatch(storyGet(id, demo));
            }
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
    handleCursorActivity(cm) {
        this.setState({
            ... this.state,
            currentLine: cm.doc.sel.ranges[0].head.line
        });
    },
    handleScriptChange(value, line) {
        const { handleFieldChange } = this;
        const { changedFields } = this.state;
        changedFields['script'] = value;
        this.setState({
            ... this.state,
            changedFields,
            currentLine: line
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
        const { id, demo, dispatch } = this.props;
        const { changedFields } = this.state;
        if (demo===true) {
            dispatch(storyPutDemo(changedFields));
        } else {
            if (id) {
                dispatch(storyPut(id, changedFields));
            } else {
                dispatch(storyPost(changedFields));
            }
        }
    },
    render() {
        const { handleScriptChange, handleCursorActivity } = this;
        const { id, ui_state, errors, demo } = this.props;
        const { changedFields, model, currentLine } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, storyPostSchema);

        const tokens = tokenizeScript(inputFields.script || '');

        return (
            <Form
                size="large"
                loading={ ui_state == UI_STATE.REQUESTING }
                error={ ui_state == UI_STATE.ERROR }
                success={ ui_state == UI_STATE.SUCCESS }
            >
                <Container fluid>
                    <Segment basic>
                        <Grid>
                            <Grid.Column width={ 4 } className='story-form-column'>
                                <Segment basic>
                                    <Button as='a' attached='left' disabled size='tiny' icon='edit' content='Editor' labelPosition='left'/>
                                    <Button as='a' onClick={()=>{browserHistory.push(demo===true ? `/product/demo/storyplayer` : `/story/${id}/play`)}} attached='right' size='tiny' icon='play' labelPosition='left' content='Player' />

                                    <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 }  size='tiny' labelPosition="right" content={ id ? "Save" : "Create" } icon="save"/>
                                </Segment>
                                <Container >
                                    <Container>
                                        <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                                    </Container>
                                    <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ (e) => this.handleFieldChange(e, 'name') } value={ inputFields.name || '' } required={ true }/>
                                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('name', errors)} />

                                    <Form.TextArea label="Description" placeholder="Description" id="description" onChange={ (e) => this.handleFieldChange(e, 'description') } value={ inputFields.description || '' } autoHeight={ true }/>
                                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('description', errors)} />

                                    <Form.Field label="Project" id="project_id" control={ StoryProject } projectId={ inputFields.project_id ? `${inputFields.project_id}` : '' } demo={ demo } onSelectProject={ this.handleFieldChange }/>

                                    <Form.Field
                                        label="Cast of Characters"
                                        placeholder="Cast"
                                        id="cast"
                                        control={ ScriptCastList }
                                        scriptCharacters={ tokens.characters }
                                        demo={ demo }
                                    />

                                    <div className="field">
                                        <label><Icon name="circle help"/>.fountain language help</label>
                                        <SidebarFountainHelp onClickSnippetInsert={ this.handleClickSnippetInsert } />
                                    </div>
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={ 12 }>
                                <Form.Field
                                    placeholder="Script"
                                    id="script"
                                    control={ ScriptInput }
                                    currentLine={ currentLine }
                                    script={ inputFields.script || '' }
                                    tokens={ tokens }
                                    onChange={ handleScriptChange }
                                    onCursorActivity={ handleCursorActivity }
                                />
                                <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('script', errors)} />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Container>
            </Form>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.storyReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(StoryForm);
