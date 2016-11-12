import React from 'react'
import { Link } from 'react-router'


const ConceptArtBreadcrumb = React.createClass({
    propTypes: {
        project: React.PropTypes.object,
        concept_art: React.PropTypes.object
    },

    render: function() {
        const { project, concept_art } = this.props;

        if (!concept_art) {
            return <ol className="breadcrumb"><li className="breadcrumb-item"></li></ol>;
        }
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Projects</Link></li>
                <li className="breadcrumb-item">
                    <Link to={ '/project/' + project.id }>
                        { project.name }
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link
                        to={
                            '/project/' + project.id
                            + '/concept_art'
                        }
                    >
                        Concept Art
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    { concept_art.name }
                </li>
            </ol>
        );
    }
})

module.exports.ConceptArtBreadcrumb = ConceptArtBreadcrumb
