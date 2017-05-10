import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import ProjectDetail from 'components/ui/detail/project-detail';
import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/header/logged-in-header';


const Project = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <ProjectDetail id={ id } />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default Project;
