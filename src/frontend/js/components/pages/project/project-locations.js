import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'
import {CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';

import { Card } from '../../ui/card'
import { CardActionsButton } from '../../ui/card-actions-button'
import { CardClickable } from '../../ui/card-clickable'
import { Count } from '../../ui/count'
import { Image } from '../../ui/image'


const ProjectLocations = React.createClass({
    propTypes: {
      project: React.PropTypes.object.isRequired
    },
    render: function() {
        const { project } = this.props;

        if (!project)
            return null;

        let nodes = project.locations.map(function(location){

            return (
                <Card
                    className="col-xs-3"
                    key={ location.id }
                >
                    <span>{ location.name }</span>
                    <Image src={ location.content } />
                    <CardActions className="clearfix text-align-right">
                        <CardActionsButton
                            title="View"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/location/${location.id}`)}
                            secondary={ true }
                        />
                        <CardActionsButton
                            title="Edit"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/location/${location.id}/edit`)}
                            secondary={ true }
                        />
                    </CardActions>
            </Card>
            );
        });

        return (
            <Card className='card-display'>
                <CardTitle
                    actAsExpander={ true }
                    showExpandableButton={ true }
                >
                    <Count count={ project.locations.length } /><span className='section-header'>Locations</span>
                </CardTitle>
                <CardMedia expandable={ true } className="clearfix">
                    { nodes }
                </CardMedia>
                <CardActions className="clearfix text-align-right">
                    <CardActionsButton
                        title="View"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/location`)}
                    />
                </CardActions>
            </Card>
        );
    }
})

module.exports.ProjectLocations = ProjectLocations
