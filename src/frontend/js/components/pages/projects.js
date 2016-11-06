import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'

import { Project } from "./projects/project"
import { HeaderPage } from "../ui/header-page"
import { HeaderPageButton } from "../ui/header-page-button"
import {
    ProjectsBreadcrumb
} from './projects/projects-breadcrumb'
import UiState from '../ui/ui-state'

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';


import { getProjects } from  '../../actions/projects'


const Projects = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getProjects());
    },
    render() {
        const { ui_state, projects } = this.props;
        if (!projects)
            return <UiState state={ ui_state } />
        return this.renderBody();
    },
    renderBody() {

        const { ui_state, projects } = this.props

        let projectNodes =  projects.map(function(project) {
            return (
                <Project
                    className="col-lg-6"
                    project={ project }
                    key={ project.id }
                >
                </Project>
            );
        });

        return (
            <div>

                <ProjectsBreadcrumb />

                <UiState state={ ui_state } />

                <HeaderPage title="Projects">
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/project/add')}
                        title="Add"
                    />
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/project/edit')}
                        title="Reorder"
                    />
                </HeaderPage>

                <div className="projectsList">
                    { projectNodes }
                </div>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, projects } = state.projects;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        projects: projects
    }
}

export default connect(mapStateToProps)(Projects);
