import React from 'react';
import {
    Container,
    Header,
    Image,
    Grid,
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import ExternalHeader from 'components/ui/header/external-header';
import ContactForm from 'components/form/contact-form';

const Contact = React.createClass({
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
                    <ExternalHeader onClickLogin={ this.toggleVisibility } path={ path } securityContext={ securityContext }/>
                    <Segment className="main-content" as={ Container }>
                        <Container textAlign="center">
                            <Header as="h1" className="display-header">Contact Us</Header>
                            <p>Have any questions or comments? Please drop us a line.</p>
                        </Container>
                        <ContactForm  />
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})

export default Contact;
