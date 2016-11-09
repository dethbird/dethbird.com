import classNames from 'classnames';
import React from 'react'
import { browserHistory, Link } from 'react-router'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

import { cardHeaderStyle } from "../../../constants/styles"
import { CardActionsButton } from "../../ui/card-actions-button"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { Description } from "../../ui/description"
import { Image } from "../../ui/image"


const Project = React.createClass({
    propTypes: {
      project: React.PropTypes.object.isRequired,
      className: React.PropTypes.string
    },

    render: function() {
        let that = this
        const { project } = this.props
        let className = classNames([this.props.className, 'project'])

        return (
            <Card
                className={ className }
                key={ project.id }
            >
                <CardHeader
                    avatar={ project.content }
                    actAsExpander={true}
                    showExpandableButton={true}
                    title={ project.name }
                    titleStyle={ cardHeaderStyle }
                    subtitle={ project.slugline }
                />
                <CardText expandable={true}>
                    <CardMedia>
                        <Link to={
                            '/project/' + project.id
                        }
                        >
                            <Image src={ project.content } />
                        </Link>
                    </CardMedia>

                    <List>
                        <ListItem>
                            <Count count={ that.props.project.storyboards.length } /> Storyboards
                        </ListItem>
                        <ListItem>
                            <Count count={ that.props.project.characters.length } /> Characters
                        </ListItem>
                        <ListItem>
                            <Count count={ that.props.project.concept_art.length } /> Concept Art
                        </ListItem>
                        <ListItem>
                            <Count count={ that.props.project.reference_images.length } /> Reference Images
                        </ListItem>
                        <ListItem>
                            <Count count={ that.props.project.locations.length } /> Locations
                        </ListItem>
                        <ListItem>
                            <Count count={ that.props.project.scripts.length } /> Scripts
                        </ListItem>
                    </List>

                </CardText>

                <CardActions className="text-align-right">
                    <CardActionsButton
                        title="View"
                        onTouchTap={() => browserHistory.push('/project/' + project.id )}
                    />
                    <CardActionsButton
                        title="Edit"
                        onTouchTap={() => browserHistory.push('/project/' + project.id + '/edit')}
                    />
                </CardActions>
            </Card>
        );
    }
})

module.exports.Project = Project
