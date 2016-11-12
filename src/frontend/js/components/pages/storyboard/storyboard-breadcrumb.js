import React from 'react'
import { Link } from 'react-router'


const StoryboardBreadcrumb = React.createClass({
    propTypes: {
        project: React.PropTypes.object,
        storyboard: React.PropTypes.object
    },

    render: function() {
        const { project, storyboard } = this.props;

        if (!storyboard) {
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
                            + '/storyboards'
                        }
                    >
                        Storyboards
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    { storyboard.name }
                </li>
            </ol>
        );
    }
})

module.exports.StoryboardBreadcrumb = StoryboardBreadcrumb
