import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import { HeaderPage } from '../ui/header-page'
import { HeaderPageButton } from '../ui/header-page-button'
import { ProjectBreadcrumb } from "./project/project-breadcrumb"
import { ProjectCharacters } from "./project/project-characters"
import { ProjectConceptArts } from "./project/project-concept_arts"
import { ProjectDetails } from "./project/project-details"
import { ProjectLocations } from "./project/project-locations"
import { ProjectReferenceImages } from "./project/project-reference_images"
import { ProjectStoryboards } from "./project/project-storyboards"
import { ProjectScripts } from "./project/project-scripts"
import { SectionHeader } from "../ui/section-header"
import UiState from '../ui/ui-state'

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import { getProject } from  '../../actions/project'

const Project = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId } = this.props.params;

        dispatch(getProject(projectId));
    },
    render() {
        const { ui_state, project } = this.props;
        const { projectId } = this.props.params;

        if(!project)
            return <UiState state={ ui_state } />

        return (
            <div className="projectPage">

                <ProjectBreadcrumb project={ project } />

                <UiState state={ ui_state } />

                <HeaderPage title={ project.name }>
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/project/' + projectId + '/edit')}
                        title="Edit"
                    />
                </HeaderPage>

                <ProjectDetails project={ project } />
                <ProjectCharacters project={ project } />
                <ProjectStoryboards project={ project } />
                <ProjectConceptArts project={ project } />
                <ProjectReferenceImages project={ project } />
                <ProjectLocations project={ project } />
                <ProjectScripts project={ project } />
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, project } = state.project;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        project: project
    }
}

export default connect(mapStateToProps)(Project);
