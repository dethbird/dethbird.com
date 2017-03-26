import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';
import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/logged-in-header';


const Dashboard = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } />
                <Segment className="main-content">Dashboard</Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default Dashboard;
