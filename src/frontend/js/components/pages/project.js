import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import { buttonStyle } from '../../constants/styles'
import { ProjectBreadcrumb } from "./project/project-breadcrumb"
import { ProjectCharacters } from "./project/project-characters"
import { ProjectConceptArts } from "./project/project-concept_arts"
import { ProjectDetails } from "./project/project-details"
import { ProjectLocations } from "./project/project-locations"
import { ProjectReferenceImages } from "./project/project-reference_images"
import { ProjectStoryboards } from "./project/project-storyboards"
import { SectionHeader } from "../ui/section-header"

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import UiState from '../ui/ui-state'

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

        if (ui_state == UI_STATE_COMPLETE) {
            return (
                <div className="projectPage">
                    <ProjectBreadcrumb project={ project } />

                    <div className="text-align-right">
                        <FloatingActionButton
                            onTouchTap={() => browserHistory.push('/project/' + projectId + '/edit')}
                            title="Edit"
                            style={ buttonStyle }
                        >
                            <EditorModeEdit />
                        </FloatingActionButton>
                    </div>

                    <ProjectDetails project={ project } />
                    <ProjectCharacters project={ project } />
                    <ProjectStoryboards project={ project } />
                    <ProjectConceptArts project={ project } />
                    <ProjectReferenceImages project={ project } />
                    <ProjectLocations project={ project } />
                </div>
            )
        }
        return (
            <UiState state={ ui_state } />
        );
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
