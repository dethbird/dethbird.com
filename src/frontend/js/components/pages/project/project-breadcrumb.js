import React from 'react'
import { Link } from 'react-router'


const ProjectBreadcrumb = React.createClass({
    propTypes: {
        project: React.PropTypes.object
    },

    render: function() {
        const { project } = this.props;
        if (!project)
            return <ol className="breadcrumb"><li className="breadcrumb-item" /></ol>
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/projects">Projects</Link></li>
                <li className="breadcrumb-item">{ project.name }</li>
            </ol>
        );
    }
})

module.exports.ProjectBreadcrumb = ProjectBreadcrumb
