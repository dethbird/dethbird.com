import React from 'react';

import InternalLayout from 'components/layout/internal';
import ProjectsList from 'components/ui/list/projects-list';


const Projects = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <ProjectsList />
            </InternalLayout>
        );
    }
})

export default Projects;
