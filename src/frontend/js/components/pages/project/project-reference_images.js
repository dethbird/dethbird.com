import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'
import {CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';

import { Card } from '../../ui/card'
import { CardActionsButton } from '../../ui/card-actions-button'
import { CardClickable } from '../../ui/card-clickable'
import { Count } from '../../ui/count'
import { Image } from '../../ui/image'


const ProjectReferenceImages = React.createClass({
    propTypes: {
      project: React.PropTypes.object.isRequired
    },
    render: function() {
        const { project } = this.props;

        if (!project)
            return null;

        let nodes = project.reference_images.map(function(reference_image){

            return (
                <Card
                    className="content-secondary"
                    key={ reference_image.id }
                >
                    <span>{ reference_image.name }</span>
                    <Image src={ reference_image.content } />
                    <CardActions className="clearfix text-align-right">
                        <CardActionsButton
                            title="View"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/reference_image/${reference_image.id}`)}
                            secondary={ true }
                        />
                        <CardActionsButton
                            title="Edit"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/reference_image/${reference_image.id}/edit`)}
                            secondary={ true }
                        />
                    </CardActions>
            </Card>
            );
        });

        return (
            <Card className='content-primary'>
                <CardTitle
                    actAsExpander={ true }
                    showExpandableButton={ true }
                >
                    <Count count={ project.reference_images.length } /><span className='section-header'>Reference Images</span>
                </CardTitle>
                <CardMedia expandable={ true } className="clearfix">
                    { nodes }
                </CardMedia>

                <CardActions className="clearfix text-align-right">
                    <CardActionsButton
                        title="Add"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/reference_image/add`)}
                    />
                    <CardActionsButton
                        title="Reorder"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/reference_image/edit`)}
                    />
                </CardActions>
            </Card>
        );
    }
})

module.exports.ProjectReferenceImages = ProjectReferenceImages
