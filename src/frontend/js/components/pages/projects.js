import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentSort from 'material-ui/svg-icons/content/sort'

import { buttonStyle } from '../../constants/styles'
import { Project } from "./projects/project"
import {
    ProjectsBreadcrumb
} from './projects/projects-breadcrumb'
import { Spinner } from "../ui/spinner"

import {
    UI_STATE_INITIALIZING,
    UI_STATE_REQUESTING,
    UI_STATE_ERROR,
    UI_STATE_SUCCESS,
} from '../../constants/ui-state';

import UiState from '../ui/ui-state'

import { getProjects } from  '../../actions/projects'


const Projects = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getProjects());
    },
    render() {

        const { ui_state, projects } = this.props
        
        if (ui_state == UI_STATE_SUCCESS) {
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

                    <div className="text-align-right">
                        <FloatingActionButton
                            onTouchTap={() => browserHistory.push('/project/add')}
                            title="Add"
                            style={ buttonStyle }
                        >
                            <ContentAdd />
                        </FloatingActionButton>

                        <FloatingActionButton
                            onTouchTap={() => browserHistory.push('/project/edit')}
                            title="Reorder"
                            style={ buttonStyle }
                        >
                            <ContentSort />
                        </FloatingActionButton>
                    </div>

                    <br />

                    <div className="projectsList">
                        { projectNodes }
                    </div>
                </div>
            )
        }
        return (
            <UiState state={ ui_state } />
        );
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
