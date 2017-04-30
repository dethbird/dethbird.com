import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'underscore';
import {
    Button,
    Card,
    Container
} from 'semantic-ui-react';

import ProjectCard from 'components/ui/card/project-card';
import { UI_STATE } from 'constants/ui-state';
import { projectsGet } from 'actions/project';

const StoryProject = React.createClass({
    propTypes: {
        projectId: React.PropTypes.string,
        demo: React.PropTypes.bool
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(projectsGet());
    },
    render() {
        const { projectId, models } = this.props;

        if (!projectId) {
            return (
                <Button basic as="a" size="mini" fluid>Add to project</Button>
            )
        }

        const project = _.findWhere(models, { id: parseInt(projectId) });

        if (!project)
            return null;

        return (
            <div>{ project.name } <Button as="a" basic size="mini" className="right floated">Change</Button></div>
        )

        console.log(project);

        // const projectNodes = models ? models.map(function(project, i){
        //     return (
        //         <ProjectCard project={ project } key={ i } />
        //     );
        // }) : [];
        //
        // return (
        //     <Container>
        //         <Card.Group itemsPerRow={ 4 } >
        //             { projectNodes }
        //         </Card.Group>
        //     </Container>
        // );
        return null;
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

export default connect(mapStateToProps)(StoryProject);
