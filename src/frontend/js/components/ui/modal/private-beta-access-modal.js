import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Checkbox,
    Container,
    Header,
    Input,
    Form,
    Grid,
    Modal,
    TextArea
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { privatebetaPost } from 'actions/private-beta';
import characterPostSchema from 'validation_schema/character-post.json';
import * as jsonSchema from 'utility/json-schema';

const PrivateBetaAccessModal = React.createClass({
    getInitialState() {
        return {
            changedFields: {},
            model: undefined
        }
    },
    propTypes: {
        modalVisible: React.PropTypes.bool,
        toggleModalVisible: React.PropTypes.func.isRequired
    },
    handleFieldChange(e, elementId) {
        const { changedFields } = this.state;
        changedFields[elementId] = e.currentTarget.value;
        this.setState({
            ... this.state,
            changedFields
        });
    },
    render() {
        const { modalVisible, toggleModalVisible } = this.props;
        const { id, ui_state, errors } = this.props;
        const { changedFields, model } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, characterPostSchema);
        return (

                <Modal dimmer='blurring' open={modalVisible} onClose={ toggleModalVisible }>
                        <Modal.Header>Application for Private Beta Access</Modal.Header>
                        <Modal.Content>
                            <Form
                                size="large"
                                loading={ ui_state == UI_STATE.REQUESTING }
                                error={ ui_state == UI_STATE.ERROR }
                                success={ ui_state == UI_STATE.SUCCESS }
                            >
                                <Grid>
                                    <Grid.Column width={ 8 } as={ Container }>
                                        <Form.Field>
                                            <label>Field(s) of Interest</label>
                                            <p>Are you a student or professional or just interested in any of these fields?</p>
                                            <Grid as={ Container }>
                                                <Grid.Row>
                                                    <Checkbox label='Animation' id="field_animation" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Checkbox label='Screenwriting' id="field_screenwriting" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Checkbox label='Advertising' id="field_advertising" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Checkbox label='Video Games' id="field_video_games" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <TextArea autoHeight id="field_other" placeholder="Other"></TextArea>
                                                </Grid.Row>
                                            </Grid>
                                        </Form.Field>


                                        <Form.Field>
                                            <label>What do you hope StoryStation will be able to do for you?</label>
                                            <TextArea autoHeight id="field_other" placeholder="Make storywriting much quicker and simpler ... "></TextArea>
                                        </Form.Field>


                                    </Grid.Column>

                                    <Grid.Column width={ 8 } as={ Container }>
                                        <Form.Field required>
                                            <label>Username</label>
                                            <Input
                                                required
                                                label={{ basic: true, content: '@' }}
                                                labelPosition='left'
                                                placeholder='choose a username'
                                                onChange={ (e) => this.handleFieldChange(e, 'username') }
                                                value={ inputFields.username || '' }
                                            />
                                        </Form.Field>
                                        <Form.Input label="Email" placeholder="joeschmoe@joeschmoestudios.com" id="email" type="email" onChange={ (e) => this.handleFieldChange(e, 'email') } value={ inputFields.email || '' } required={ true }/>
                                        <Form.Input label="Name" placeholder="Joe Schmoe" id="name" type="text" onChange={ (e) => this.handleFieldChange(e, 'name') } value={ inputFields.name || '' } />
                                        <Form.Field>
                                            <label>We would love to see your work. Do you have a portfolio or other links?</label>
                                            <TextArea autoHeight id="field_other" placeholder="https://portfolios.com/joeschmoe"></TextArea>
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button as="a" onClick={ toggleModalVisible }>Cancel</Button>
                            <Button as="a" positive icon='checkmark' labelPosition='right' content="Apply" onClick={()=>{}} disabled={ false }/>
                        </Modal.Actions>
                </Modal>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.privatebetaReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(PrivateBetaAccessModal);
