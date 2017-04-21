import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Grid,
    Header,
    Loader,
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { newsfeedGet } from 'actions/newsfeed';

import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import ExternalHeader from 'components/ui/header/external-header';
import NewsfeedCard from 'components/ui/card/newsfeed-card';

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
    renderNewsFeedItems() {
        const { models } = this.props;
        if (!models)
            return <Loader active>Loading</Loader>;

        const nodes = models.map(function(item, i){
            return (
                <Grid.Column  key={ i }>
                    <NewsfeedCard model={ item }/>
                </Grid.Column>
            );
        });
        return nodes;
    },
    render() {
        const { path } = this.props.route;
        const { renderNewsFeedItems } = this;
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
                            <Header as="h1" className='display-header'>Animation and Showbiz Newsfeed</Header>
                        </Container>
                        <Container>
                            <Container text textAlign="center">Showbiz and animation articles that we think are worth sharing.</Container>
                            <br />
                            <Grid columns={ 4 }>
                                { renderNewsFeedItems() }
                            </Grid>
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
