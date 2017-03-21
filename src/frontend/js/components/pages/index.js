import React from 'react';
import {
    Button,
    Container,
    Header,
    Image,
    Icon,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import LoginForm from 'components/ui/form/login-form';

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
        const { securityContext } = this.props.route.props;
        const { visible } = this.state;

        return (
            <Sidebar.Pushable>
                <Sidebar as={ Segment } animation='overlay' direction='top' visible={visible} inverted={ true }>
                    <LoginForm onClickCancel={ this.toggleVisibility }/>
                </Sidebar>
                <Sidebar.Pusher as={ Segment.Group } dimmed={ visible } className="main-content">
                    <Segment inverted={ true } className="masthead">
                        <Container>
                            <Menu size="large" secondary={ true } inverted={ true } pointing={ true }>
                                <Menu.Item active={ true }>One</Menu.Item>
                                <Menu.Item>Two</Menu.Item>
                                <Menu.Item as="div" className="right">
                                    <Button inverted={ true } onClick={ this.toggleVisibility }>Login</Button>
                                    <Button inverted={ true }>Signup</Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>
                    <Segment>index</Segment>
                    <Segment inverted={ true }>index</Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})

export default Index;
