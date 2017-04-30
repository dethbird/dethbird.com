import React from 'react';
import {
    Container,
    Segment,
    Header
} from 'semantic-ui-react';

import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/header/logged-in-header';
import ChangelogList from 'components/ui/list/changelog-list';



const Dashboard = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <Container textAlign="center">
                        <Header className="display-header">Dashboard</Header>
                    </Container>
                    <Container text>
                        <ChangelogList />
                    </Container>
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default Dashboard;
