import React from 'react'
import ReactMarkdown from 'react-markdown'
import Modal from 'react-modal'
import { browserHistory, Link } from 'react-router'
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux'

import { Card } from "../ui/card"
import { CardClickable } from "../ui/card-clickable"
import { CardBlock } from "../ui/card-block"
import { Count } from "../ui/count"
import { Description } from "../ui/description"
import { Fountain } from "../ui/fountain"
import { ImagePanelRevision } from "../ui/image-panel-revision"
import { PanelModal } from "./storyboard/panel-modal"
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
                    <div
                        key={ panel.id }
                        className="col-lg-4"
                    >
                        <Card>
                            <h4 className="card-header">Panel { i + 1 }</h4>
                            <div onClick={ () => browserHistory.push(
                                    '/project/' + projectId + '/storyboard/' + storyboardId + '/panel/' + panel.id) }
                            >
                                <ImagePanelRevision { ...props }></ImagePanelRevision>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <Fountain source={ panel.script} />
                                </li>
                                <li className="list-group-item">
                                    <Count count={ panel.revisions.length } /> Revisions
                                </li>
                                <li className="list-group-item">
                                    <Count count={ panel.comments.length } /> Comments
                                </li>
                            </ul>
                            <CardBlock>
                                <Link to={
                                        '/project/' + projectId
                                        + '/storyboard/' + storyboardId
                                        + '/panel/' + panel.id
                                    }><TimeAgo
                                        date={ panel.date_updated }
                                    />
                                </Link>

                                <div className="pull-right">
                                    <span className="tag tag-default">{ i + 1 }</span>
                                </div>
                            </CardBlock>
                        </Card>
                    </div>
                );
            });

            return (
                <div>
                    <StoryboardBreadcrumb
                        project={ project }
                        storyboard={ storyboard }
                    >
                    </StoryboardBreadcrumb>

                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link
                                to={
                                    '/project/' + projectId
                                    + '/storyboard/' + storyboardId
                                    + '/edit'
                                }
                                className="btn btn-info"
                            >Edit</Link>
                        </li>
                    </ul>
                    <br />

                    <div className="StoryboardDetailsContainer">
                        <Card>
                            <h3 className="card-header">{ storyboard.name }</h3>
                            <CardBlock>
                                <Description source ={ storyboard.description } />
                            </CardBlock>
                        </Card>
                    </div>

                    {(() => {
                        if (storyboard.script) {
                            return (
                                <SectionHeader>Script</SectionHeader>
                            )
                        }
                    })()}

                    {(() => {
                        if (storyboard.script) {
                            return (
                                <div className="StoryboardPanelsContainer">
                                    <Card>
                                        <CardBlock>
                                            <Fountain source={ storyboard.script } />
                                        </CardBlock>
                                    </Card>
                                </div>
                            )
                        }
                    })()}

                    <section className="clearfix well">
                        <div className="pull-left">
                            <SectionHeader><Count count={ storyboard.panels.length } /> Panels</SectionHeader>
                        </div>
                        <ul className="pull-right nav nav-pills">
                            <li className="nav-item">
                                <Link
                                    className="btn btn-success"
                                    to={
                                        '/project/' + projectId
                                        + '/storyboard/' + storyboardId
                                        + '/panel/add'
                                    }
                                >Add</Link>
                            </li>
                        </ul>
                        <br className="clearfix" />
                    </section>

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
