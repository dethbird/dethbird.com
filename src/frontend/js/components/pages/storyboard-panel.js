import classNames from 'classnames'
import React from 'react'
import Modal from 'react-modal'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'

import { Card } from "../ui/card"
import { SectionHeader } from "../ui/section-header"
import { CardClickable } from "../ui/card-clickable"
import { CardComment } from "../ui/card-comment"
import { CardBlock } from "../ui/card-block"
import { CardStoryboardPanel } from "../ui/card-storyboard-panel"
import { Count } from "../ui/count"
import { Description } from "../ui/description"
import { Fountain } from "../ui/fountain"
import { ImagePanelRevision } from "../ui/image-panel-revision"
import {
    StoryboardPanelBreadcrumb
} from "./storyboard-panel/storyboard-panel-breadcrumb"

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import UiState from '../ui/ui-state'

import { getStoryboardPanel } from  '../../actions/storyboard-panel'

const StoryboardPanel = React.createClass({
    getInitialState() {
        return {
            showDeleteModal: false
        }
    },
    componentWillMount() {
        console.log('mounted');
        const { dispatch } = this.props;
        const { projectId, storyboardId, panelId } = this.props.params;
        dispatch(getStoryboardPanel(projectId, storyboardId, panelId));
    },
    // componentDidMount() {
    //     $.ajax({
    //         url: '/api/project/' + this.props.params.projectId,
    //         dataType: 'json',
    //         cache: false,
    //         success: function(data) {
    //             let storyboard = _.findWhere(data.storyboards, {
    //                 'id': parseInt(this.props.params.storyboardId)
    //             });
    //             let panel = _.findWhere(storyboard.panels, {
    //                 'id': parseInt(this.props.params.panelId)
    //             });
    //
    //             this.setState({
    //                 formStatus: null,
    //                 formMessage: null,
    //                 project: data,
    //                 storyboard: storyboard,
    //                 panel: panel,
    //                 showDeleteModal: false
    //             });
    //         }.bind(this),
    //         error: function(xhr, status, err) {
    //             console.error(this.props.url, status, err.toString());
    //         }.bind(this)
    //     });
    // },
    handleClickDelete() {
        const { showDeleteModal } = this.state;
        this.setState({
            showDeleteModal: !showDeleteModal
        });
    },
    handleClickDeleteConfirm() {
        event.preventDefault()
        var that = this
        $.ajax({
            cache: false,
            method: 'DELETE',
            url: '/api/project_storyboard_panel/'
                + that.state.panel.id,
            beforeSend: function() {
                this.setState({
                    formStatus: 'info',
                    formMessage: 'Working.',
                    showDeleteModal: false
                })
            }.bind(this),
            success: function(data) {
                this.setState({
                    formStatus: 'success',
                    formMessage: 'Success.'
                });
                setTimeout(function(){
                    browserHistory.push(
                        '/project/' + projectId
                        + '/storyboard/' + storyboardId
                    );
                }, 2000);
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    formStatus: 'danger',
                    formMessage: 'Error: ' + xhr.responseText
                })
            }.bind(this)
        });
    },
    handleClickCloseModal() {
        this.setState({
            showDeleteModal: false
        });
    },
    render() {
        const { ui_state, panel } = this.props;
        if (!panel)
            return <UiState state={ ui_state } />

        return this.renderBody();
    },
    renderBody() {
        const { ui_state, project, storyboard, panel } = this.props;
        const { projectId, storyboardId, panelId } = this.props.params;
        const { showDeleteModal } = this.state;


        let panelRevisionNodes = panel.revisions.map(function(revision) {
            let props = {};
                props.src = revision.content
            return (
                <CardClickable
                    className="col-lg-4"
                    key={ revision.id }
                    onClick={ () => browserHistory.push( '/project/'
                        + projectId + '/storyboard/'
                        + storyboardId + '/panel/'
                        + panelId
                        + '/revision/' + revision.id
                        + '/edit'
                    ) }
                >
                    <div className="text-align-center">
                        <ImagePanelRevision { ...props } ></ImagePanelRevision>
                    </div>
                    <CardBlock>
                        <Description source={ revision.description } />
                    </CardBlock>
                </CardClickable>
            );
        });

        let panelCommentNodes = panel.comments.map(function(comment) {
            return (
                <CardComment
                    comment={ comment }
                    link= {
                        '/project/' + projectId
                        + '/storyboard/' + storyboardId
                        + '/panel/' + panelId
                        + '/comment/' + comment.id
                        + '/edit'
                    }
                    key={ comment.id }
                >
                </CardComment>
            );
        });

        return (
            <div>
                <UiState state={ ui_state } />
                <StoryboardPanelBreadcrumb { ...this.props } />

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link
                            className="nav-link btn btn-info"
                            to={
                                '/project/' + projectId
                                + '/storyboard/' + storyboardId
                                + '/panel/' + panelId
                                + '/edit'
                            }>Edit</Link>
                    </li>
                    <li className="nav-item">
                        <a onClick={ this.handleClickDelete } className='btn btn-secondary'>Delete</a>
                    </li>
                </ul>

                <Modal
                    isOpen={ showDeleteModal }
                    shouldCloseOnOverlayClick={ true }
                >
                    <CardBlock>
                        Really delete?
                    </CardBlock>
                    <CardBlock className='btn-group'>
                        <a
                            className='btn btn-danger'
                            onClick={ this.handleClickDeleteConfirm }
                        >Delete</a>
                        <a
                            className='btn btn-secondary'
                            onClick={ this.handleClickCloseModal }
                        >Cancel</a>
                    </CardBlock>

                </Modal>
                <br />

                <div className="StoryboardPanelDetailsContainer">
                    <CardStoryboardPanel
                        projectId={ projectId }
                        storyboardId={ storyboardId }
                        panel={ panel }
                    ></CardStoryboardPanel>
                </div>

                <section className="clearfix well">
                    <div className="pull-left">
                        <SectionHeader><Count count={ panel.revisions.length } /> Revisions</SectionHeader>
                    </div>
                    <ul className="pull-right nav nav-pills">
                        <li className="nav-item">
                            <Link
                                className="btn btn-success"
                                to={
                                    '/project/' + projectId
                                    + '/storyboard/' + storyboardId
                                    + '/panel/' + panelId
                                    + '/revision/add'
                                }
                            >Add</Link>
                        </li>
                    </ul>
                    <br className="clearfix" />
                </section>

                <div className="clearfix PanelRevisionsContainer">
                    { panelRevisionNodes }
                </div>

                <section className="clearfix well">
                    <div className="pull-left">
                        <SectionHeader><Count count={ panel.comments.length } /> Comments</SectionHeader>
                    </div>
                    <ul className="pull-right nav nav-pills">
                        <li className="nav-item">
                            <Link
                                className="btn btn-success"
                                to={
                                    '/project/' + projectId
                                    + '/storyboard/' + storyboardId
                                    + '/panel/' + panelId
                                    + '/comment/add'
                                }
                            >Add</Link>
                        </li>
                    </ul>
                    <br className="clearfix" />
                </section>

                <div className="clearfix PanelCommentsContainer">
                    { panelCommentNodes }
                </div>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    const { ui_state, project, storyboard, panel } = state.storyboardPanel;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        project,
        storyboard,
        panel
    }
}

export default connect(mapStateToProps)(StoryboardPanel);
