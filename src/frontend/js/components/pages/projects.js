import React from 'react'
import { browserHistory, Link } from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentSort from 'material-ui/svg-icons/content/sort'

import { Project } from "./projects/project"
import {
    ProjectsBreadcrumb
} from './projects/projects-breadcrumb'
import { Spinner } from "../ui/spinner"

const buttonStyle = {
    margin: '5px'
};

const Projects = React.createClass({
    componentDidMount() {
        $.ajax({
            url: '/api/projects',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({projects: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render() {
        let that = this
        if (this.state) {
            let projectNodes = this.state.projects.map(function(project) {
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
            <Spinner />
        )
    }
})

module.exports.Projects = Projects
