import classNames from 'classnames'
import React from 'react'
import Modal from 'react-modal'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'

import { Card } from "../ui/card"
import { CardClickable } from "../ui/card-clickable"
import { SectionHeader } from "../ui/section-header"
import { CardComment } from "../ui/card-comment"
import { CardBlock } from "../ui/card-block"
import { Count } from "../ui/count"
import { Description } from "../ui/description"
import { Fountain } from "../ui/fountain"
import { HeaderPage } from "../ui/header-page"
import { HeaderPageButton } from "../ui/header-page-button"
import { Image } from "../ui/image"
import { Section } from "../ui/section"
import { SectionButton } from "../ui/section-button"
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
        const { dispatch } = this.props;
        const { projectId, storyboardId, panelId } = this.props.params;
        dispatch(getStoryboardPanel(projectId, storyboardId, panelId));
    },
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
            return (
                <CardClickable
                    className="col-lg-3 clickable"
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
                        <Image src={ revision.content } />
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

        const mainImage = (panel) => {
            if (panel.revisions.length)
                return panel.revisions[0].content
            return null;
        }

        return (
            <div>
                <UiState state={ ui_state } />

                <StoryboardPanelBreadcrumb { ...this.props } />

                <HeaderPage title={ panel.name }>
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/panel/' + panel.id + '/edit' )}
                        title="Edit"
                    />
                    <HeaderPageButton
                        onTouchTap={ this.handleClickDelete }
                        title="Delete"
                    />
                </HeaderPage>

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
                    <Image src={ mainImage(panel) } />
                </div>

                <Section title="Revisions" count={ panel.revisions.length }>
                    <SectionButton
                        onTouchTap={() => browserHistory.push(
                            '/project/' + projectId
                            + '/storyboard/' + storyboardId
                            + '/panel/' + panelId
                            + '/revision/add' )
                        }
                        title="Add"
                    />
                </Section>

                <div className="clearfix PanelRevisionsContainer">
                    { panelRevisionNodes }
                </div>

                <Section title="Comments" count={ panel.comments.length }>
                    <SectionButton
                        onTouchTap={() => browserHistory.push(
                            '/project/' + projectId
                            + '/storyboard/' + storyboardId
                            + '/panel/' + panelId
                            + '/comment/add' )
                        }
                        title="Add"
                    />
                </Section>

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
