import React from 'react';

import InternalLayout from 'components/layout/internal';
import ProjectDetail from 'components/ui/detail/project-detail';


const Project = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <ProjectDetail id={ id } />
            </InternalLayout>
        );
    }
})

export default Project;
