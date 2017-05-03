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
    Segment,
    Sidebar,
} from 'semantic-ui-react';


import LoginForm from 'components/form/login-form';
import Footer from 'components/ui/footer';
import ExternalHeader from 'components/ui/header/external-header';
import PrivateBetaAccessModal from 'components/ui/modal/private-beta-access-modal';

const Product = React.createClass({
    getInitialState() {
        return (
            {
                modalVisible: false,
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
    toggleModalVisible() {
        if (!this.state.modalVisible===true) {
            ReactGA.modalview('/private-beta-access-modal');
        }
        this.setState({
            ... this.state,
            modalVisible: !this.state.modalVisible
        })
    },
    render() {
        const { toggleModalVisible } = this;
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { modalVisible, visible } = this.state;

        return (
            <Sidebar.Pushable>
                <Sidebar as={ Segment } animation='overlay' direction='top' visible={visible} inverted={ true }>
                    <LoginForm onClickCancel={ this.toggleVisibility } />
                </Sidebar>
                <Sidebar.Pusher as={ Segment.Group } dimmed={ visible } className="main-content">
                    <ExternalHeader onClickLogin={ this.toggleVisibility } path={ path } securityContext={ securityContext }/>
                    <Segment className="main-content">
                        <Container textAlign="center">
                            <Header as="h1" className='display-header'>Private Beta Access</Header>
                        </Container>
                        <Container text>
                            <p>We want <code>StoryStation</code> to be the very best product it can be. We will soon open up to the public, but for now, please apply for <code>Private Beta</code> access using the button below.</p>
                            <Header as="h3" textAlign="center">About the program</Header>
                            <p>Our <code>Private Beta</code> program is for anyone trying to write stories and looking for a new tool to streamline their work.</p>
                            <p>We would especially like you to apply if you are open to providing some feedback about future enhancements.</p>
                            <Header as="h3" textAlign="center">Be part of the future</Header>
                            <p>Once <code>Private Beta</code> is open, we will be asking our Private Beta users to vote on which features to roll out next.</p>
                        </Container>
                        <Container textAlign="center">
                            <PrivateBetaAccessModal modalVisible={ modalVisible } toggleModalVisible={ toggleModalVisible }/>
                            <Segment basic>
                                <Button size="large" as="a" color="yellow" content="Apply for Private Beta Access" labelPosition="right" icon="id card" onClick={ toggleModalVisible }/>
                            </Segment>
                        </Container>
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
})


export default Product;
