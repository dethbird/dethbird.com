import React from 'react';
import {
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import Masthead from 'components/ui/masthead';

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
                    <Masthead onClickLogin={ this.toggleVisibility } />
                    <Segment>index</Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})

export default Index;
