import React from 'react';
import {
    Container,
    Header,
    Sidebar,
    Segment
} from 'semantic-ui-react';

import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/header/logged-in-header';


const InternalLayout = React.createClass({
    render() {
        const { children, securityContext, path } = this.props;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    { children }
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default InternalLayout;
