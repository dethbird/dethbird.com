import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'
import {CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';

import { Card } from '../../ui/card'
import { CardActionsButton } from '../../ui/card-actions-button'
import { CardClickable } from '../../ui/card-clickable'
import { Count } from '../../ui/count'
import { Image } from '../../ui/image'


const ProjectScripts = React.createClass({
    propTypes: {
      project: React.PropTypes.object.isRequired
    },
    render: function() {
        const { project } = this.props;

        if (!project)
            return null;

        let nodes = project.scripts.map(function(script){

            return (
                <Card
                    className="col-xs-3"
                    key={ script.id }
                >
                    <span>{ script.name }</span>
                    <CardActions className="clearfix text-align-right">
                        <CardActionsButton
                            title="View"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/script/${script.id}`)}
                            secondary={ true }
                        />
                        <CardActionsButton
                            title="Edit"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/script/${script.id}/edit`)}
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
                    <Count count={ project.scripts.length } /><span className='section-header'>Scripts</span>
                </CardTitle>
                <CardMedia expandable={ true } className="clearfix">
                    { nodes }
                </CardMedia>

                <CardActions className="clearfix text-align-right">
                    <CardActionsButton
                        title="Add"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/script/add`)}
                    />
                    <CardActionsButton
                        title="Reorder"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/script/edit`)}
                    />
                </CardActions>
            </Card>
        );
    }
})

module.exports.ProjectScripts = ProjectScripts
