import React from 'react'
import { Link } from 'react-router'


const StoryboardPanelBreadcrumb = React.createClass({

    propTypes: {
        project: React.PropTypes.object,
        storyboard: React.PropTypes.object,
        panel: React.PropTypes.object
    },

    render: function() {
        const { project, storyboard, panel } = this.props;
        if (!project) {
            return <ol className="breadcrumb" />;
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
                    <Link
                        to={
                            '/project/' + project.id
                            + '/storyboard/' + storyboard.id
                        }
                    >
                        { storyboard.name }
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    Panels
                </li>
                <li className="breadcrumb-item">
                    { panel ? panel.name : 'Add' }
                </li>
            </ol>
        );
    }
})

module.exports.StoryboardPanelBreadcrumb = StoryboardPanelBreadcrumb
