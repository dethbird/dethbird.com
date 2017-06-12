import React from 'react';

import InternalLayout from 'components/layout/internal';
import UsersList from 'components/ui/list/users-list';


const AdminUsers = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <UsersList />
            </InternalLayout>
        );
    }
})

export default AdminUsers;
