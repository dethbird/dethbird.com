import React from 'react';
import {
    Button,
    Container,
    Grid,
    Header,
    Image,
    Loader,
    Segment,
    Sidebar,
} from 'semantic-ui-react';


import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import ExternalHeader from 'components/ui/header/external-header';

const Product = React.createClass({
    getInitialState() {
        return (
            {
                visible: false
            }
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
                    <ExternalHeader onClickLogin={ this.toggleVisibility } path={ path } securityContext={ securityContext }/>
                    <Segment className="main-content">
                        <Container textAlign="center">
                            <Header as="h1" className='display-header'>Product and Features</Header>
                            <p>A closer look at StoryStation and it's features.</p>
                        </Container>
                        <Segment as={ Container } text>
                            <Grid>
                                <Grid.Column width={ 6 }>
                                    <Image shape="rounded" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                </Grid.Column>
                                <Grid.Column width={ 10 }>
                                    <Header as="h3">Project Manager</Header>
                                    <Segment basic>
                                        A <code>Project</code> is how a movie or show is classified. It contains a single or sequence of <code>Stories</code>, as well as <code>Characters</code> and any other assets that pertain to a single project. The <strong>Project Manager</strong> simply lets you track and manage these assets.
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        <Segment as={ Container } text>
                            <Grid>
                                <Grid.Column width={ 6 }>
                                    <Image shape="rounded" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                </Grid.Column>
                                <Grid.Column width={ 10 }>
                                    <Header as="h3">Story Editor</Header>
                                    <Segment basic>
                                        <p>In StoryStation, a <code>Story</code> represents an episode or prequels / sequels of a project. For example, <em>Return of the Jedi</em> or <em>Simpsons Season 5, Episide 8</em> are both <code>Stories</code>.</p>
                                        <p>The <strong>Story Editor</strong> itself consists of a "code editor" which highlights syntax in the <code>.fountain</code> script writing language. A live preview of the script can be seen on the right in print-mode. On the left, the cast of characters is listed and added to live, as the script is being written.</p>
                                        <p>More info on <code>.fountain</code> can be found at <a href="http://fountain.io" target="_blank">http://fountain.io</a></p>
                                        <p>
                                            <Button color="green" size="mini">Try the Demo</Button>
                                        </p>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        <Segment as={ Container } text>
                            <Grid>
                                <Grid.Column width={ 6 }>
                                    <Image shape="rounded" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                </Grid.Column>
                                <Grid.Column width={ 10 }>
                                    <Header as="h3">Story Player</Header>
                                    <Segment basic>
                                        <p>The <strong>Story Editor</strong> and <strong>Story Player</strong> are based around the script you have written in <code>.fountain</code> format. However, StoryStation has extended <code>.fountain</code> with a few flavorings of it's own. Namely, you can define a <code>Image</code> and <code>Duration</code> on a <code>Panel</code></p>
                                        <p>Once you have written some dialogue and action and given their panels images and durations, you're ready to hit PLAY and watch your story play in storyboard form in the <strong>Story Player.</strong></p>
                                        <p>This allows you to get a feel for the overall length of your acts, scenes, and panels.</p>
                                        <p>
                                            <Button color="green" size="mini">Try the Demo</Button>
                                        </p>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        <Segment as={ Container } text>
                            <Grid>
                                <Grid.Column width={ 6 }>
                                    <Image shape="rounded" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                </Grid.Column>
                                <Grid.Column width={ 10 }>
                                    <Header as="h3">Character Editor</Header>
                                    <Segment basic>
                                        <p>The <strong>Character Editor</strong> just lets you give a <code>Character</code> properties like age, sex, occupation, personality traits, description, and additional images (side view, front view, etc.) to bring your <code>Character</code> to life.</p>
                                        <p>A character is ultimately connected to a <code>Story</code> but you can create one and not have it attached to any story, whenever you are inspired.</p>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        <Segment as={ Container } text>
                            <Grid>
                                <Grid.Column width={ 6 }>
                                    <Image shape="rounded" verticalAlign="middle" src="http://react.semantic-ui.com/assets/images/wireframe/image.png" size="large"/>
                                </Grid.Column>
                                <Grid.Column width={ 10 }>
                                    <Header as="h3">Pitch Generator</Header>
                                    <Segment basic>
                                        <p>We believe the entire point of writing a <code>Story</code> is to get it made. Once your project is ready to shop around, you can use the <strong>Pitch Generator</strong> to assemble your assets into a pitch you can take the the studios. For an example, see the pitch-sheet for the hit animated show <em>Adventure Time</em>, available <a href="https://www.scribd.com/document/3122798/Adventure-Time-series-presentation" target="_blank">here</a>.</p>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})


export default Product;
