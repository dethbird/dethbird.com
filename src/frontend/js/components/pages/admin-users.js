import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import UsersList from 'components/ui/list/users-list';
import LoggedInHeader from 'components/ui/header/logged-in-header';
import Footer from 'components/ui/footer';


const AdminUsers = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <UsersList />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default AdminUsers;
