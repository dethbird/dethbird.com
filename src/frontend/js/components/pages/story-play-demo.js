import React from 'react';
import {
    Segment,
    Sidebar
} from 'semantic-ui-react';

import StoryPlayer from 'components/ui/story-player';
import Footer from 'components/ui/footer';
import LoginForm from 'components/form/login-form';
import ExternalHeader from 'components/ui/header/external-header';


const StoryPlayDemo = React.createClass({
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
        const { id } = this.props.params;
        const { visible } = this.state;

        return (
            <Sidebar.Pushable>
                <Sidebar as={ Segment } animation='overlay' direction='top' visible={visible} inverted={ true }>
                    <LoginForm onClickCancel={ this.toggleVisibility }/>
                </Sidebar>
                <Sidebar.Pusher as={ Segment.Group } dimmed={ visible } className="main-content">
                    <ExternalHeader onClickLogin={ this.toggleVisibility } path={ path } securityContext={ securityContext }  subheader="StoryPlayer Demo"/>
                    <Segment className="main-content">
                        <StoryPlayer id='1' demo={ true }/>
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
})

export default StoryPlayDemo;
