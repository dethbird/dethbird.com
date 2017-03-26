import React from 'react';
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react';


const Dashboard = React.createClass({
    render() {
        const { securityContext } = this.props.route.props;

        return (
            <Container className="main-content">
                Dashboard
            </Container>
        );
    }
})

export default Dashboard;
