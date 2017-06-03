import React from 'react';
import ReactGA from 'react-ga';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import {
    Button,
    Checkbox,
    Container,
    Header,
    Input,
    Form,
    Grid,
    Message,
    TextArea,
    Segment
} from 'semantic-ui-react';

import ErrorMessage from 'components/ui/error-message';
import { UI_STATE } from 'constants/ui-state';
import { privatebetaPost, privatebetaReset } from 'actions/private-beta';
import privatebetaPostSchema from 'validation_schema/private-beta-post.json';
import * as jsonSchema from 'utility/json-schema';

const PrivateBetaForm = React.createClass({
    getInitialState() {
        return {
            changedFields: {},
            model: undefined
        }
    },
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(privatebetaReset());
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
    handleCaptchaChange(value){
        const { handleFieldChange } = this;
        handleFieldChange(new Event('handleCaptchaChange'), {
            id: 'captcha',
            value
        });
    },
    onClickSubmit() {
        const { dispatch } = this.props;
        const { changedFields } = this.state;

        ReactGA.event({
            category: 'Form Submit',
            action: 'Private Beta Application'
        });

        dispatch(privatebetaPost(changedFields));
    },
    render() {
        const { handleFieldChange, onClickSubmit, handleCaptchaChange } = this;
        const { id, ui_state, errors, model } = this.props;
        const { changedFields } = this.state;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, privatebetaPostSchema);

        if (ui_state == UI_STATE.SUCCESS) {
            return (
                <Segment>
                    <Header as="h2">Application for Private Beta Access</Header>
                    <Container>
                        <Message positive>
                            <Message.Header>Success!</Message.Header>
                            <p>Your application was submitted successfully.</p>
                        </Message>
                        <p>Please check your email for a verification link sent to <strong>{ model.email }</strong> and click to verify your account.</p>
                        <p>This will secure the username <strong>@{ model.username }</strong>. </p>
                        <p>Once <code>Private Beta</code> is officially open, you will receive another message to let you know your account has been activated.</p>
                    </Container>
                </Segment>
            )
        }

        return (
                <Container text>
                    <Container textAlign="center">
                        <Header as="h1" className='display-header'>Application for Private Beta Access</Header>
                    </Container>
                    <Segment>
                        <Container>
                            <Form
                                size="large"
                                loading={ ui_state == UI_STATE.REQUESTING }
                                error={ ui_state == UI_STATE.ERROR }
                                success={ ui_state == UI_STATE.SUCCESS }
                            >
                                <Container>
                                    <ErrorMessage message={ jsonSchema.getGlobalErrorMessage(errors)} />
                                </Container>
                                <Grid>
                                    <Grid.Column width={ 8 } as={ Container }>
                                        <Form.Field>
                                            <label>Are you a student or professional or just interested in any of these fields?</label>
                                            <br />
                                            <Grid as={ Container }>
                                                <Grid.Row>
                                                    <Checkbox label='Animation' id="field_animation" onChange={ handleFieldChange } value="1" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Checkbox label='Screenwriting' id="field_screenwriting" onChange={ handleFieldChange } value="1" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Checkbox label='Advertising' id="field_advertising" onChange={ handleFieldChange } value="1" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Checkbox label='Video Games' id="field_video_games" onChange={ handleFieldChange } value="1" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <TextArea autoHeight id="field_other" placeholder="Other" onChange={ handleFieldChange } ></TextArea>
                                                </Grid.Row>
                                            </Grid>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>What do you hope StoryStation will be able to do for you?</label>
                                            <TextArea autoHeight id="intent" placeholder="Make storywriting much quicker and simpler ... "  onChange={ handleFieldChange } ></TextArea>
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column width={ 8 } as={ Container }>

                                        <Form.Field required>
                                            <label>Username</label>
                                            <Input
                                                id="username"
                                                required
                                                label={{ basic: true, content: '@' }}
                                                labelPosition='left'
                                                placeholder='choose a username'
                                                onChange={ handleFieldChange }
                                                value={ inputFields.username || '' }
                                            />
                                        </Form.Field>
                                        <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('username', errors)} />

                                        <Form.Input label="Email" placeholder="joeschmoe@joeschmoestudios.com" id="email" type="email" onChange={ handleFieldChange }  required={ true }/>
                                        <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('email', errors)} />

                                        <Form.Input label="Name" placeholder="Joe Schmoe" id="name" type="text" onChange={ handleFieldChange }  />
                                        <Form.Field>
                                            <label>We would love to see your work. Do you have a portfolio or other links?</label>
                                            <TextArea autoHeight id="portfolio" placeholder="https://portfolios.com/joeschmoe" onChange={ handleFieldChange } ></TextArea>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Anything else you'd like to comment or on or ask about?</label>
                                            <TextArea autoHeight id="comments" placeholder="Additional comments ..." onChange={ handleFieldChange } ></TextArea>
                                        </Form.Field>
                                        <Form.Field>
                                            <ReCAPTCHA
                                                ref="recaptcha"
                                                sitekey="6LchDiAUAAAAAO73Wy0P0WoBT_Xjvul9aGhGuIvN"
                                                onChange={ handleCaptchaChange }
                                            />
                                            <ErrorMessage message={ jsonSchema.getErrorMessageForProperty('captcha', errors)} />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid>
                            </Form>
                        </Container>
                        <Container>
                            <Button as="a" positive icon='checkmark' labelPosition='right' content="Apply" onClick={ onClickSubmit } disabled={ Object.keys(changedFields).length===0 } loading={ ui_state == UI_STATE.REQUESTING }/>
                        </Container>
                    </Segment>
                </Container>
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

export default connect(mapStateToProps)(PrivateBetaForm);
