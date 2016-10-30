import classNames from 'classnames'
import React from 'react'
import Modal from 'react-modal'
import { browserHistory, Link } from 'react-router'

import { Alert } from "../ui/alert"
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
import { Spinner } from "../ui/spinner"


const StoryboardPanel = React.createClass({
    componentDidMount() {
        $.ajax({
            url: '/api/project/' + this.props.params.projectId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                let storyboard = _.findWhere(data.storyboards, {
                    'id': parseInt(this.props.params.storyboardId)
                });
                let panel = _.findWhere(storyboard.panels, {
                    'id': parseInt(this.props.params.panelId)
                });

                this.setState({
                    formStatus: null,
                    formMessage: null,
                    project: data,
                    storyboard: storyboard,
                    panel: panel,
                    showDeleteModal: false
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleClickDelete() {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
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
                        '/project/' + that.props.params.projectId
                        + '/storyboard/' + that.props.params.storyboardId
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
    handleClickRevision(revision_id) {
        browserHistory.push(
            '/project/' + this.props.params.projectId
            + '/storyboard/' + this.props.params.storyboardId
            + '/panel/' + this.props.params.panelId
            + '/revision/' + revision_id
            + '/edit'
        )
    },
    render() {
        let that = this
        if (this.state){

            let panelRevisionNodes = this.state.panel.revisions.map(function(revision) {
                let props = {};
                    props.src = revision.content
                return (
                    <CardClickable
                        className="col-lg-4"
                        key={ revision.id }
                        onClick={ that.handleClickRevision.bind(that, revision.id) }
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

            let panelCommentNodes = this.state.panel.comments.map(function(comment) {
                return (
                    <CardComment
                        comment={ comment }
                        link= {
                            '/project/' + that.props.params.projectId
                            + '/storyboard/' + that.props.params.storyboardId
                            + '/panel/' + that.props.params.panelId
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
                    <StoryboardPanelBreadcrumb { ...this.state } />

                    <Alert
                        status={ this.state.formStatus }
                        message={ this.state.formMessage }
                    />

                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link
                                className="nav-link btn btn-info"
                                to={
                                    '/project/' + that.props.params.projectId
                                    + '/storyboard/' + that.props.params.storyboardId
                                    + '/panel/' + that.props.params.panelId
                                    + '/edit'
                                }>Edit</Link>
                        </li>
                        <li className="nav-item">
                            <a onClick={ this.handleClickDelete } className='btn btn-secondary'>Delete</a>
                        </li>
                    </ul>

                    <Modal
                        isOpen={ this.state.showDeleteModal }
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
                            projectId={ this.props.params.projectId }
                            storyboardId={ this.props.params.storyboardId }
                            panel={ this.state.panel }
                        ></CardStoryboardPanel>
                    </div>

                    <section className="clearfix well">
                        <div className="pull-left">
                            <SectionHeader><Count count={ this.state.panel.revisions.length } /> Revisions</SectionHeader>
                        </div>
                        <ul className="pull-right nav nav-pills">
                            <li className="nav-item">
                                <Link
                                    className="btn btn-success"
                                    to={
                                        '/project/' + that.props.params.projectId
                                        + '/storyboard/' + that.props.params.storyboardId
                                        + '/panel/' + that.props.params.panelId
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
                            <SectionHeader><Count count={ this.state.panel.comments.length } /> Comments</SectionHeader>
                        </div>
                        <ul className="pull-right nav nav-pills">
                            <li className="nav-item">
                                <Link
                                    className="btn btn-success"
                                    to={
                                        '/project/' + that.props.params.projectId
                                        + '/storyboard/' + that.props.params.storyboardId
                                        + '/panel/' + that.props.params.panelId
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
        return (
            <Spinner />
        )
    }
})

module.exports.StoryboardPanel = StoryboardPanel
