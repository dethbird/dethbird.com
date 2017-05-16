import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import AdminUserForm from 'components/form/admin-user-form';
import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/header/logged-in-header';


const AdminUserEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <AdminUserForm id={ id } />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default AdminUserEdit;
