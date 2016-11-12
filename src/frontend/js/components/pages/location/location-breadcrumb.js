import React from 'react'
import { Link } from 'react-router'

const LocationBreadcrumb = React.createClass({
    propTypes: {
        project: React.PropTypes.object,
        location: React.PropTypes.object
    },

    render: function() {
        const { project, location } = this.props;
        if (!location) {
            return <ol className="breadcrumb"></ol>;
        }
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={ '/project/' + project.id + '/storyboards' }>Project</Link></li>
                <li className="breadcrumb-item"><Link to={ `/project/${project.id}` }>{ project.name }</Link></li>
                <li className="breadcrumb-item">Location</li>
                <li className="breadcrumb-item">{ location.name }</li>
            </ol>
        );
    }
})

module.exports.LocationBreadcrumb = LocationBreadcrumb
