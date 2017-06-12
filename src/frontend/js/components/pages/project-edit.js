import React from 'react';

import InternalLayout from 'components/layout/internal';
import ProjectForm from 'components/form/project-form';


const ProjectEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <ProjectForm id={ id } />
            </InternalLayout>
        );
    }
})

export default ProjectEdit;
