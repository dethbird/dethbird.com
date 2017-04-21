import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { newsfeedGet } from 'actions/newsfeed';

import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import Masthead from 'components/ui/masthead';

const Newsfeed = React.createClass({
    getInitialState() {
        return (
            {
                visible: false
            }
        );
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(newsfeedGet());
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
                    <LoginForm onClickCancel={ this.toggleVisibility } />
                </Sidebar>
                <Sidebar.Pusher as={ Segment.Group } dimmed={ visible } className="main-content">
                    <Masthead onClickLogin={ this.toggleVisibility } />
                    <Segment className="main-content">
                        <Container>
                            <Header as="h1">Newsfeed</Header>
                        </Container>
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.newsfeedReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(Newsfeed);
