import React from 'react'
import ReactMarkdown from 'react-markdown'
import Modal from 'react-modal'
import { browserHistory, Link } from 'react-router'
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/assessment';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ContentAdd from 'material-ui/svg-icons/content/add'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

import { buttonStyle, cardHeaderStyle } from '../../constants/styles'
import { CardClickable } from "../ui/card-clickable"
import { CardBlock } from "../ui/card-block"
import { Count } from "../ui/count"
import { Description } from "../ui/description"
import { Fountain } from "../ui/fountain"
import { ImagePanelRevision } from "../ui/image-panel-revision"
import { SectionHeader } from "../ui/section-header"
import {
    StoryboardBreadcrumb
} from "./storyboard/storyboard-breadcrumb"

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import UiState from '../ui/ui-state'

import { getStoryboard } from  '../../actions/storyboard'


const Storyboard = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, storyboardId } = this.props.params;
        dispatch(getStoryboard(projectId, storyboardId));
    },
    render() {

        const { ui_state, project, storyboard } = this.props;
        const { projectId, storyboardId } = this.props.params;

        if (ui_state == UI_STATE_COMPLETE) {

            var storyboardPanelNodes = storyboard.panels.map(function(panel, i) {

                let props = {};
                if (panel.revisions.length > 0)
                    props.src = panel.revisions[0].content
                return (
                    <Card
                        key={ panel.id }
                        className="col-lg-4"
                    >
                        <CardTitle
                            title={ `Panel ${ i + 1 }` }
                            titleStyle={ cardHeaderStyle }
                        />
                        <div onClick={ () => browserHistory.push(
                            '/project/' + projectId + '/storyboard/' + storyboardId + '/panel/' + panel.id) }
                        >
                            <ImagePanelRevision { ...props }></ImagePanelRevision>
                        </div>
                        <CardMedia>
                            <Fountain source={ panel.script} />
                            <List>
                                <ListItem>
                                    <Count count={ panel.revisions.length } /> Revisions
                                </ListItem>
                                <ListItem>
                                    <Count count={ panel.comments.length } /> Comments
                                </ListItem>
                            </List>
                        </CardMedia>

                        <CardActions className="pull-right">
                            <FloatingActionButton
                                onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/panel/' + panel.id )}
                                title="View"
                                style={ buttonStyle }
                                mini={ true }
                                zDepth={ 1 }
                            >
                                <ActionAssessment />
                            </FloatingActionButton>

                            <FloatingActionButton
                                onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/panel/' + panel.id + '/edit')}
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
            });

            return (
                <div>
                    <StoryboardBreadcrumb
                        project={ project }
                        storyboard={ storyboard }
                    >
                    </StoryboardBreadcrumb>

                    <CardActions className="clearfix">
                        <div className="pull-left">
                            <h1>{ storyboard.name }</h1>
                            <Description source ={ storyboard.description } />
                            <Fountain source={ storyboard.script } />
                        </div>
                        <div className="pull-right">
                            <FloatingActionButton
                                onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/edit')}
                                title="Edit"
                                style={ buttonStyle }
                            >
                                <EditorModeEdit />
                            </FloatingActionButton>
                        </div>
                    </CardActions>

                    <div className="clearfix" />

                    <CardActions className="clearfix">
                        <div className="pull-left">
                            <h3><Count count={ storyboard.panels.length } /> Panels</h3>
                        </div>
                        <div className="pull-right">
                            <FloatingActionButton
                                onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/panel/add')}
                                title="Add"
                                style={ buttonStyle }
                                secondary={ true }
                            >
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>
                    </CardActions>

                    <div className="clearfix" />

                    <div className="StoryboardPanelsContainer">
                        { storyboardPanelNodes }
                    </div>
                </div>
            );

        }
        return (
            <UiState state={ ui_state } />
        );
    }
})

const mapStateToProps = (state) => {
    const { ui_state, project, storyboard } = state.storyboard;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        project,
        storyboard
    }
}

export default connect(mapStateToProps)(Storyboard);
