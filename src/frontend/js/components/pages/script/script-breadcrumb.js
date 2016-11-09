import React from 'react'
import { Link } from 'react-router'

const ScriptBreadcrumb = React.createClass({
    propTypes: {
        project: React.PropTypes.object,
        script: React.PropTypes.object
    },

    render: function() {
        const { project, script } = this.props;
        if (!script) {
            return <ol className="breadcrumb"></ol>;
        }
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={ '/project/' + project.id + '/storyboards' }>Project</Link></li>
                <li className="breadcrumb-item"><Link to={ `/project/${project.id}` }>{ project.name }</Link></li>
                <li className="breadcrumb-item">Script</li>
                <li className="breadcrumb-item">{ script.name }</li>
            </ol>
        );
    }
})

module.exports.ScriptBreadcrumb = ScriptBreadcrumb
