import React from 'react'
import { Link } from 'react-router'

const ReferenceImageBreadcrumb = React.createClass({
    propTypes: {
        project: React.PropTypes.object,
        reference_image: React.PropTypes.object
    },

    render: function() {
        const { project, reference_image } = this.props;
        if (!reference_image) {
            return <ol className="breadcrumb"></ol>;
        }
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={ '/project/' + project.id + '/storyboards' }>Project</Link></li>
                <li className="breadcrumb-item"><Link to={ `/project/${project.id}` }>{ project.name }</Link></li>
                <li className="breadcrumb-item">Reference Image</li>
                <li className="breadcrumb-item">{ reference_image.name }</li>
            </ol>
        );
    }
})

module.exports.ReferenceImageBreadcrumb = ReferenceImageBreadcrumb
