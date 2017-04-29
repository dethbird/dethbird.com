import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Container
} from 'semantic-ui-react';

import ProjectCard from 'components/ui/card/project-card';
import { UI_STATE } from 'constants/ui-state';
import { projectsGet } from 'actions/project';

const ProjectsList = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(projectsGet());
    },
    render() {
        const { models } = this.props;

        const projectNodes = models ? models.map(function(project, i){
            return (
                <ProjectCard project={ project } key={ i } />
            );
        }) : [];

        return (
            <Container>
                <Card.Group itemsPerRow={ 4 } >
                    { projectNodes }
                </Card.Group>
            </Container>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.projectsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(ProjectsList);
