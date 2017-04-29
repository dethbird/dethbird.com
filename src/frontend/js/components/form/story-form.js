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
import ScriptCastList from 'components/ui/form/script-cast-list';
import SidebarFountainHelp from 'components/ui/sidebar/sidebar-fountain-help';
import { UI_STATE } from 'constants/ui-state';
import { storyGet, storyGetDemo, storyPut, storyPutDemo, storyPost } from 'actions/story';
import storyPostSchema from 'validation_schema/story-post.json';
import * as jsonSchema from 'utility/json-schema';


const StoryForm = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        demo: React.PropTypes.bool
    },
    getInitialState() {
        return {
            changedFields: {},
            model: undefined
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
        const { id, ui_state, errors, demo } = this.props;
        const { changedFields, model } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, storyPostSchema);

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
                                    <Button attached='left' disabled size='tiny'>
                                        <Icon name="edit" /> Editor
                                    </Button>
                                    <Button as="a" onClick={()=>{browserHistory.push(demo===true ? `/product/demo/storyplayer` : `/story/${id}/play`)}} attached='right' size='tiny'>
                                        <Icon name="play" /> Player
                                    </Button>

                                    <Button as="a" color={ id ? "blue" : "green" } onClick={ this.onClickSubmit } disabled={ Object.keys(changedFields).length===0 }  size='tiny' floated='right'>
                                        <Icon name="save" /> { id ? "Save" : "Create" }
                                    </Button>
                                </Segment>
                                <Container >
                                    <Container>
                                        <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                                    </Container>
                                    <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ (e) => this.handleFieldChange(e, 'name') } value={ inputFields.name || '' } required={ true }/>
                                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('name', errors)} />

                                    <Form.TextArea label="Description" placeholder="Description" id="description" onChange={ (e) => this.handleFieldChange(e, 'description') } value={ inputFields.description || '' } autoHeight={ true }/>
                                    <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('description', errors)} />

                                    <Form.Field label="Cast of Characters" placeholder="Cast" id="cast" control={ ScriptCastList }  script={ inputFields.script || '' } demo={ demo }/>

                                    <div className="field">
                                        <label><Icon name="circle help"/>.fountain language help</label>
                                        <SidebarFountainHelp onClickSnippetInsert={ this.handleClickSnippetInsert } />
                                    </div>
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={ 12 }>
                                <Form.Field placeholder="Script" id="script" control={ ScriptInput }  script={ inputFields.script || '' } onChange={ this.handleFieldChange }/>
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
