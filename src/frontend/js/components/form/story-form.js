import React from 'react';
import ReactGA from 'react-ga';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Divider,
    Form,
    Grid,
    Icon,
    Image,
    Label,
    Message,
    Segment
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { storyGet, storyGetDemo, storyPut, storyPutDemo, storyPost } from 'actions/story';
import storyPostSchema from 'validation_schema/story-post.json';
import * as jsonSchema from 'utility/json-schema';
import { tokenizeScript, millisecondsToDuration } from 'utility/script-utils';

import ErrorMessage from 'components/ui/error-message';
import ScriptInput from 'components/ui/form/script-input';
import ScriptCastList from 'components/ui/list/script-cast-list';
import StoryProject from 'components/ui/form/story-project';
import FountainHelpModal from 'components/ui/modal/fountain-help-modal';


const StoryForm = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        demo: React.PropTypes.bool
    },
    getInitialState() {
        return {
            changedFields: {},
            model: undefined,
            currentLine: undefined,
            helpModalVisible: false
        }
    },
    toggleModalVisible() {
        if (!this.state.modalVisible===true) {
            ReactGA.modalview('/fountain-help-modal');
        }
        this.setState({
            ... this.state,
            helpModalVisible: !this.state.helpModalVisible
        })
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
        const { handleScriptChange, handleCursorActivity, toggleModalVisible } = this;
        const { id, ui_state, errors, demo } = this.props;
        const { changedFields, model, currentLine, helpModalVisible } = this.state;
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
                                <Container>
                                    <Grid>
                                        <Grid.Column width={ 8 }>
                                            <Button as='a' attached='left' disabled size='tiny' icon='edit' content='Editor' labelPosition='left'/>
                                            <Button as='a' onClick={()=>{browserHistory.push(demo===true ? `/product/demo/storyplayer` : `/story/${id}/play`)}} attached='right' size='tiny' icon='play' labelPosition='left' content='Player' />
                                            <br />
                                            <span className='duration'>{ millisecondsToDuration(tokens.duration_in_milliseconds) }</span>
                                        </Grid.Column>
                                        <Grid.Column width={ 8 } textAlign='right'>
                                            <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 }  size='tiny' labelPosition="right" content={ "Save" } icon="save"/>
                                        </Grid.Column>
                                    </Grid>
                                    <br />
                                </Container>
                                <Container>
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
                                        <Button as="a" content=".fountain syntax sheet" icon="circle help" labelPosition="left" onClick={ toggleModalVisible } />
                                        <FountainHelpModal
                                            onClickSnippetInsert={ this.handleClickSnippetInsert }
                                            modalVisible={ helpModalVisible }
                                            toggleModalVisible={ toggleModalVisible }
                                        />
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
