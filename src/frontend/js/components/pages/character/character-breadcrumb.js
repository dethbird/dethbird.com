import React from 'react'
import { Link } from 'react-router'

const CharacterBreadcrumb = React.createClass({
    propTypes: {
        project: React.PropTypes.object,
        character: React.PropTypes.object
    },

    render: function() {
        const { project, character } = this.props;

        if (!character) {
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
                <li className="breadcrumb-item">Characters</li>
                <li className="breadcrumb-item">
                    { character.name }
                </li>
            </ol>
        );
    }
})

module.exports.CharacterBreadcrumb = CharacterBreadcrumb
