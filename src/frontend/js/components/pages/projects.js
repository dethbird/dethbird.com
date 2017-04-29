import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import ProjectsList from 'components/ui/list/projects-list';
import LoggedInHeader from 'components/ui/header/logged-in-header';
import Footer from 'components/ui/footer';


const Projects = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <ProjectsList />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default Projects;
