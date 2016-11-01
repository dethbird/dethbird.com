import classNames from 'classnames';
import React from 'react'
import { browserHistory, Link } from 'react-router'
import TimeAgo from 'react-timeago'

import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionHome from 'material-ui/svg-icons/action/assessment';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import { buttonStyle } from '../../../constants/styles'
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
                />
                <CardText expandable={true}>
                    <CardMedia>
                        <Link to={
                            '/project/' + project.id
                        }
                        >
                            <ImagePanelRevision { ...{ src: project.content }} />
                        </Link>
                    </CardMedia>

                    <List>
                        <ListItem
                            onTouchTap={
                                () => { browserHistory.push('/project/' + project.id + '/storyboards')}
                            }
                        >
                            <Count count={ that.props.project.storyboards.length } /> Storyboards
                        </ListItem>
                        <ListItem
                            onTouchTap={
                                () => { browserHistory.push('/project/' + project.id + '/characters')}
                            }
                        >
                            <Count count={ that.props.project.characters.length } /> Characters
                        </ListItem>
                        <ListItem
                            onTouchTap={
                                () => { browserHistory.push('/project/' + project.id + '/concept_art')}
                            }
                        >
                            <Count count={ that.props.project.concept_art.length } /> Concept Art
                        </ListItem>
                        <ListItem
                            onTouchTap={
                                () => { browserHistory.push('/project/' + project.id + '/reference_images')}
                            }
                        >
                            <Count count={ that.props.project.concept_art.length } /> Reference Images
                        </ListItem>
                        <ListItem
                            onTouchTap={
                                () => { browserHistory.push('/project/' + project.id + '/locations')}
                            }
                        >
                            <Count count={ that.props.project.concept_art.length } /> Locations
                        </ListItem>
                    </List>

                </CardText>

                <CardActions>
                    <FloatingActionButton
                        onTouchTap={() => browserHistory.push('/project/' + project.id )}
                        title="View"
                        style={ buttonStyle }
                        mini={ true }
                        zDepth={ 1 }
                    >
                        <ActionAssessment />
                    </FloatingActionButton>

                    <FloatingActionButton
                        onTouchTap={() => browserHistory.push('/project/' + project.id + '/edit')}
                        title="Edit"
                        style={ buttonStyle }
                        mini={ true }
                        zDepth={ 1 }
                    >
                        <EditorModeEdit />
                    </FloatingActionButton>
                </CardActions>
            </Card>
        );
    }
})

module.exports.Project = Project
