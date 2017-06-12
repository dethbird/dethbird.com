import React from 'react';

import InternalLayout from 'components/layout/internal';
import StoriesList from 'components/ui/list/stories-list';


const Stories = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <StoriesList />
            </InternalLayout>
        );
    }
})

export default Stories;
