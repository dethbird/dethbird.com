import React from 'react';
import {
    Container,
    Divider,
    Header,
    Image,
    Grid,
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import Masthead from 'components/ui/header/masthead';

const Index = React.createClass({
    getInitialState() {
        return (
            { visible: false }
        );
    },
    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    },
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { visible } = this.state;

        return (
            <Sidebar.Pushable>
                <Sidebar as={ Segment } animation='overlay' direction='top' visible={visible} inverted={ true }>
                    <LoginForm onClickCancel={ this.toggleVisibility } />
                </Sidebar>
                <Sidebar.Pusher as={ Segment.Group } dimmed={ visible } className="main-content">
                    <Masthead onClickLogin={ this.toggleVisibility } path={ path } securityContext={ securityContext }/>
                    <Segment className="main-content" as={ Container }>
                        <Container textAlign="center">
                            <Header as="h1" className="display-header">Storywriting tools for a workflow upgrade.</Header>
                        </Container>
                        <br />
                        <Container text>
                            <Grid>
                                <Grid.Row>
                                    <Grid verticalAlign='middle'>
                                        <Grid.Column width={ 11 }  textAlign="right">
                                            <Header as="h2">What is it?</Header>
                                            <p>StoryStation is a tool for pre-pre-pre-production, a.k.a. story development.</p>
                                            <p>It is designed for rapid iteration and development of your narrative projects.</p>
                                        </Grid.Column>
                                        <Grid.Column width={ 5 }>
                                            <Image spaced shape="circular" verticalAlign="middle" src="https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg"/>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                                <Divider />
                                <Grid.Row>
                                    <Grid verticalAlign='middle'>
                                        <Grid.Column width={ 5 }>
                                            <Image spaced shape="circular" verticalAlign="middle" src="https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg" size="large"/>
                                        </Grid.Column>
                                        <Grid.Column width={ 11 }>
                                            <Header as="h2">What does it do?</Header>
                                            <ul>
                                                <li>Use the <code>Character Editor</code> to flesh out your characters and connect them to scripts later. Add side views, front views, different traits, and other information to give you a good picture.</li>
                                                <li>The <code>Smart Script Editor</code> highlights character names, dialogue, acts, scenes, and other screenplay syntax to let you quickly write your story.</li>
                                                <li>Once you have your story fleshed out, use the <code>Pitch Generator</code> to create a pitch for your show or movie that you can take to the studios.</li>
                                                <li>Once your storyboarding is complete, export your panels and get to work on your project in your animating / production tool of choice.</li>
                                            </ul>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                                <Divider />
                                <Grid.Row>
                                    <Grid verticalAlign='top'>
                                        <Grid.Column width={ 11 } textAlign="right">
                                            <Header as="h2">How does it work?</Header>
                                            <p>Under the hood, StoryStation uses the <code>.fountain</code> script-writing format. Our ScriptEditor is like a code-editor for screenplay writing, providing syntax-highlighting for .fountain keywords and syntax.</p>
                                            <Header as="h3">About .fountain</Header>
                                            <p>Fountain is a simple markup syntax for writing, editing and sharing screenplays in plain, human-readable text.</p>
                                            <p>Even when <a href="https://fountain.io/_downloads/Big-Fish.fountain" target="_blank">viewed as plain text</a>, your screenplay <em>feels</em> like a screenplay.</p>
                                            <Header as="h3">Learn more</Header>
                                            <p>Learn more at <a href="https://fountain.io" target="_blank">fountain.io</a>.</p>
                                        </Grid.Column>
                                        <Grid.Column width={ 5 }>
                                            <Image spaced verticalAlign="middle" src="/img/icon/fountain.png" size="large"/>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})

export default Index;
