import React from 'react';
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
    Segment,
    Sidebar,
} from 'semantic-ui-react';


import LoginForm from 'components/form/login-form';
import PrivateBetaForm from 'components/form/private-beta-form';
import Footer from 'components/ui/footer';
import ExternalHeader from 'components/ui/header/external-header';

const PrivateBetaApply = React.createClass({
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
                        <PrivateBetaForm />
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})


export default PrivateBetaApply;
