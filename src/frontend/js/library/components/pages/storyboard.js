import React from 'react'
import ReactMarkdown from 'react-markdown'
import Modal from 'react-modal'
import { browserHistory, Link } from 'react-router'
import TimeAgo from 'react-timeago'

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
import { Spinner } from "../ui/spinner"


const Storyboard = React.createClass({
    componentDidMount() {
        var that = this
        $.ajax({
            url: '/api/project/' + this.props.params.projectId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                let storyboard = _.findWhere(data.storyboards, {
                    'id': parseInt(this.props.params.storyboardId)
                });

                let panelModals = [];
                storyboard.panels.map(function(panel){
                    panelModals[panel.id] = false
                });

                this.setState({
                    project: data,
                    storyboard,
                    panelModals
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    closePanelModal(panel_id) {
        let panelModals = this.state.panelModals
        panelModals[panel_id] = false
        this.setState({
            panelModals
        })
    },
    handleClickPanel(panel_id) {
        let panelModals = this.state.panelModals
        panelModals[panel_id] = true
        this.setState({
            panelModals
        })
    },
    render() {

        if (this.state) {
            const { storyboard } = this.state

            var that = this;
            var storyboardPanelNodes = this.state.storyboard.panels.map(function(panel) {

                let props = {};
                if (panel.revisions.length > 0)
                    props.src = panel.revisions[0].content
                return (
                    <div
                        key={ panel.id }
                        className="col-lg-4"
                    >
                        <Modal
                              isOpen={ that.state.panelModals[panel.id] }
                              onRequestClose = { that.closePanelModal.bind(that, panel.id)}
                              shouldCloseOnOverlayClick={ true }
                        ><PanelModal panel={ panel }></PanelModal>
                        </Modal>
                        <Card>
                            <h4 className="card-header">{ panel.name }</h4>
                            <div onClick={ that.handleClickPanel.bind(that, panel.id) }>
                                <ImagePanelRevision { ...props }></ImagePanelRevision>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <Count count={ panel.comments.length } /> Comments
                                </li>
                                <li className="list-group-item">
                                    <Count count={ panel.revisions.length } /> Revisions
                                </li>
                            </ul>
                            <CardBlock>
                                <Link to={
                                        '/project/' + that.props.params.projectId
                                        + '/storyboard/' + that.props.params.storyboardId
                                        + '/panel/' + panel.id + '/edit'
                                    }><TimeAgo
                                        date={ panel.date_updated }
                                    />
                                </Link>
                            </CardBlock>
                        </Card>
                    </div>
                );
            });

            return (
                <div>
                    <StoryboardBreadcrumb
                        project={ this.state.project }
                        storyboard={ this.state.storyboard }
                    >
                    </StoryboardBreadcrumb>
                    <div className="StoryboardDetailsContainer">
                        <Card>
                            <h3 className="card-header">{ this.state.storyboard.name }</h3>
                            <CardBlock>
                                <Description source ={ this.state.storyboard.description } />
                            </CardBlock>
                            <div className='card-footer text-muted clearfix'>
                                <Link to={
                                    '/project/' + this.props.params.projectId
                                    + '/storyboard/' + this.props.params.storyboardId
                                    + '/edit'
                                }>Edit</Link>
                            </div>
                        </Card>
                    </div>
                    {(() => {
                        if (this.state.storyboard.script) {
                            return (
                                <SectionHeader>Script</SectionHeader>
                            )
                        }
                    })()}
                    {(() => {
                        if (this.state.storyboard.script) {
                            return (
                                <div className="StoryboardPanelsContainer">
                                    <Card>
                                        <CardBlock>
                                            <Fountain source={ this.state.storyboard.script } />
                                        </CardBlock>
                                    </Card>
                                </div>
                            )
                        }
                    })()}

                    <SectionHeader>{ this.state.storyboard.panels.length } Panel(s)</SectionHeader>
                    <div className="StoryboardPanelsContainer">
                        { storyboardPanelNodes }
                        <Link
                            className="btn btn-success"
                            to={
                                '/project/' + that.props.params.projectId
                                + '/storyboard/' + that.props.params.storyboardId
                                + '/panel/add'
                            }
                        >Add</Link>
                    </div>
                </div>
            );

        }
        return (
            <Spinner />
        )
    }
})

module.exports.Storyboard = Storyboard
