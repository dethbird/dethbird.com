import React from 'react';
import ReactGA from 'react-ga';
import { browserHistory } from 'react-router';
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    Label,
    Loader,
    Message,
    Segment,
    Sidebar,
} from 'semantic-ui-react';


import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import ExternalHeader from 'components/ui/header/external-header';

const Verify = React.createClass({
    propTypes: {
        verifyUser: React.PropTypes.object
    },
    getInitialState() {
        return (
            {
                visible: false
            }
        );
    },
    toggleVisibility() {
        this.setState({
            ... this.state,
            visible: !this.state.visible
        });
    },
    renderContent() {
        const { verifyUser } = this.props.route.props;

        if (verifyUser.email) {
            return (
                <div>
                    <Container text>
                        <Message positive>
                            <Message.Header>Success!</Message.Header>
                            <p>Your email address has been verified successfully.</p>
                        </Message>
                    </Container>
                    <br />
                    <Container text>
                        <p>Email address <strong>{ verifyUser.email }</strong> has been verified.</p>
                        <p>The username <strong>@{ verifyUser.username }</strong> is yours!</p>
                        <p><code>Private Beta</code> will open soon. Stay tuned for your activation email.</p>
                    </Container>
                </div>
            )
        } else {
            return (
                <div>
                    <Container text>
                        <Message negative>
                            <Message.Header>Error!</Message.Header>
                            <p>Verify token was not valid.</p>
                        </Message>
                    </Container>
                    <br />
                    <Container text>
                        <p>Either you have already verified your email address, or the the user was not found.</p>
                    </Container>
                </div>
            )
        }
    },
    render() {
        const { toggleModalVisible, renderContent } = this;
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
                            <Header as="h1" className='display-header'>Email Verification</Header>
                        </Container>
                        { renderContent() }
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})


export default Verify;
