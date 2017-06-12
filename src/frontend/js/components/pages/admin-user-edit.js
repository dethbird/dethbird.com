import React from 'react';

import InternalLayout from 'components/layout/internal';
import AdminUserForm from 'components/form/admin-user-form';


const AdminUserEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <AdminUserForm id={ id } />
            </InternalLayout>
        );
    }
})

export default AdminUserEdit;
