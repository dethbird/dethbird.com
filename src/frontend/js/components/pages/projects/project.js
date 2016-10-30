import classNames from 'classnames';
import React from 'react'
import { Link } from 'react-router'
import TimeAgo from 'react-timeago'

import { Card } from "../../ui/card"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { Description } from "../../ui/description"
import { ImagePanelRevision } from "../../ui/image-panel-revision"


const Project = React.createClass({
    propTypes: {
      project: React.PropTypes.object.isRequired,
      className: React.PropTypes.string
    },

    render: function() {
        let that = this
        let className = classNames([this.props.className, 'project'])

        let storyboardNodes = this.props.project.storyboards.map(function(storyboard) {
            return (
                <Link
                  className="dropdown-item"
                  key={ storyboard.id }
                  to={
                    '/project/' + that.props.project.id
                    + '/storyboard/' + storyboard.id
                  }
                >
                  { storyboard.name }
                </Link>
            );
        });

        return (
            <Card
                className={ className }
                key={ this.props.project.id }
            >
                <h3 className="card-header">{ this.props.project.name }</h3>
                <Link to={
                    '/project/' + that.props.project.id
                }
                >
                    <ImagePanelRevision { ...{ src: this.props.project.content }} />
                </Link>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Link
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        <Count count={ that.props.project.storyboards.length } /> Storyboards
                        </Link>
                        <div className="dropdown-menu">
                            { storyboardNodes }
                        </div>
                    </li>

                    <li className="list-group-item"><Link to={
                            '/project/' + that.props.project.id
                            + '/characters'
                        }
                        ><Count count={ that.props.project.characters.length } /> Characters</Link></li>
                    <li className="list-group-item"><Link to={
                            '/project/' + that.props.project.id
                            + '/concept_art'
                        }
                        ><Count count={ that.props.project.concept_art.length } /> Concept Art</Link></li>
                    <li className="list-group-item"><Link to={
                            '/project/' + that.props.project.id
                            + '/reference_images'
                        }
                        ><Count count={ that.props.project.reference_images.length } /> Reference Images</Link></li>
                    <li className="list-group-item"><Link to={
                            '/project/' + that.props.project.id
                            + '/locations'
                        }
                        ><Count count={ that.props.project.locations.length } /> Locations</Link></li>
                </ul>
                <CardBlock>
                    <Link to={
                            '/project/' + that.props.project.id
                            + '/edit'
                        }><TimeAgo
                            date={ this.props.project.date_updated }
                        />
                    </Link>
                </CardBlock>
            </Card>
        );
    }
})

module.exports.Project = Project
