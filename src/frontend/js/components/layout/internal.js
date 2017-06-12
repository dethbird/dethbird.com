import React from 'react';
import {
    Button,
    Container,
    Header,
    Sidebar,
    Segment
} from 'semantic-ui-react';

import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/header/logged-in-header';


const InternalLayout = React.createClass({
    getInitialState() {
        return {
            visible: false
        }
    },
    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    },
    render() {
        const { children, securityContext, path } = this.props;
        const { visible } = this.state;

        return (
            <Sidebar.Pushable>
                <Sidebar as={ Segment } animation='uncover' visible={ visible } icon='labeled' vertical inverted >
                    <LoggedInHeader path={ path } securityContext={ securityContext } />
                </Sidebar>
                <Sidebar.Pusher as= { Segment.Group } style={{ marginTop: 0 }}>
                    <Segment className="main-content" >
                        <Button as="a" onClick={this.toggleVisibility} icon={ visible ? 'close' : 'sidebar' } size='mini' secondary={ visible }/>
                        { children }
                    </Segment>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
})

export default InternalLayout;
