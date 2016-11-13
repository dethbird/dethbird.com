import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'
import {CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';

import { Card } from '../../ui/card'
import { CardActionsButton } from '../../ui/card-actions-button'
import { CardClickable } from '../../ui/card-clickable'
import { Count } from '../../ui/count'
import { Image } from '../../ui/image'


const ProjectConceptArts = React.createClass({
    propTypes: {
      project: React.PropTypes.object.isRequired
    },
    render: function() {
        const { project } = this.props;

        if (!project)
            return null;

        let nodes = project.concept_art.map(function(concept_art){
            let src;
            if(concept_art.revisions.length)
                src = concept_art.revisions[0].content;
            return (
                <Card
                    className="content-secondary"
                    key={ concept_art.id }
                >
                    <Image src={ src } />
                    <CardText className='card-text'>{ concept_art.name }</CardText>
                    <CardActions className="clearfix text-align-right">
                        <CardActionsButton
                            title="View"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/concept_art/${concept_art.id}`)}
                            secondary={ true }
                        />
                        <CardActionsButton
                            title="Edit"
                            onTouchTap={() => browserHistory.push(`/project/${project.id}/concept_art/${concept_art.id}/edit`)}
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
                    <Count count={ project.concept_art.length } /><span className='section-header'>Concept Art</span>
                </CardTitle>
                <CardMedia expandable={ true } className="clearfix">
                    { nodes }
                </CardMedia>
                <CardActions className="clearfix text-align-right">
                    <CardActionsButton
                        title="Add"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/concept_art/add`)}
                    />
                    <CardActionsButton
                        title="Reorder"
                        onTouchTap={() => browserHistory.push(`/project/${project.id}/concept_art/edit`)}
                    />
                </CardActions>
            </Card>
        );
    }
})

module.exports.ProjectConceptArts = ProjectConceptArts
