import React from 'react';
import {
    Container,
    Header
} from 'semantic-ui-react';

import InternalLayout from 'components/layout/internal';
import ChangelogList from 'components/ui/list/changelog-list';


const Dashboard = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <Container textAlign="center">
                    <Header className="display-header">Dashboard</Header>
                </Container>
                <Container text>
                    <ChangelogList />
                </Container>
            </InternalLayout>
        )
    }
})

export default Dashboard;
