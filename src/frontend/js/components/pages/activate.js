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
import ActivateForm from 'components/form/activate-form';
import Footer from 'components/ui/footer';
import ExternalHeader from 'components/ui/header/external-header';

const Activate = React.createClass({
    propTypes: {
        activationUser: React.PropTypes.object
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
    render() {
        const { toggleModalVisible, renderContent } = this;
        const { path } = this.props.route;
        const { securityContext, activationUser } = this.props.route.props;
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
                            <Header as="h1" className='display-header'>Account Activation</Header>
                        </Container>
                        <ActivateForm activationUser={ activationUser } />
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})


export default Activate;
