import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'
import {CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';

import { Card } from '../../ui/card'
import { CardActionsButton } from '../../ui/card-actions-button'
import { CardClickable } from '../../ui/card-clickable'
import { Count } from '../../ui/count'
import { Image } from '../../ui/image'

const ProjectStoryboards = React.createClass({

    render: function() {
        const { project } = this.props;

        if (!project)
            return null;

        let nodes = project.storyboards.map(function(storyboard){

            return (
                <Card
                    className="col-xs-3"
                    key={ storyboard.id }
                >
                    <span>{ storyboard.name }</span>
                    <Image src={ storyboard.content } />
                    <CardActions className="clearfix text-align-right">
                        <CardActionsButton
                            title="View"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/storyboard/${storyboard.id}`)}
                            secondary={ true }
                        />
                        <CardActionsButton
                            title="Edit"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/storyboard/${storyboard.id}/edit`)}
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
                    <Count count={ project.storyboards.length } /><span className='section-header'>Storyboards</span>
                </CardTitle>
                <CardMedia expandable={ true } className="clearfix">
                    { nodes }
                </CardMedia>
                <CardActions className="clearfix text-align-right">
                    <CardActionsButton
                        title="View"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/storyboards`)}
                    />
                </CardActions>
            </Card>
        );
    }
})

module.exports.ProjectStoryboards = ProjectStoryboards
