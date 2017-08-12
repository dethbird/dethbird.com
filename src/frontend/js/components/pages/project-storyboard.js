import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UI_STATE } from 'constants/ui-state';
import { projectStoryboardGet } from 'actions/project-storyboard';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import { CommunicationForum, ImagePhotoLibrary, AvMovie, ContentCreate } from 'material-ui/svg-icons';

import Container from 'components/layout/container';
import PanelImage from 'components/ui/panel-image';
import PanelComments from 'components/ui/panel-comments';
import PanelRevisions from 'components/ui/panel-revisions';
import ScriptPrintPreview from 'components/script/script-print-preview';
import UiStateContainer from 'components/ui/ui-state-container';

class ProjectStoryboard extends Component {
    constructor(props) {
        super(props);
        this.state = { panelDetailItem: null };
        this.renderProject = this.renderProject.bind(this);
        this.renderStoryboard = this.renderStoryboard.bind(this);
        this.renderPanels = this.renderPanels.bind(this);
        this.clickPanelDetailButton = this.clickPanelDetailButton.bind(this);
        this.onAddPanelComment = this.onAddPanelComment.bind(this);
        this.renderPanelDetailDrawer = this.renderPanelDetailDrawer.bind(this);
    }
    clickPanelDetailButton(index, panel, type) {
        this.setState({ panelDetailItem: {
            index,
            panel,
            type
        } });
    }
    onAddPanelComment() {
        const { dispatch } = this.props;
        const { projectId, storyboardId } = this.props.match.params;
        this.setState({
            panelDetailItem: null
        });
        dispatch(projectStoryboardGet(projectId, storyboardId));
    }
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, storyboardId } = this.props.match.params;
        dispatch(projectStoryboardGet(projectId, storyboardId));
    }
    renderProject(){
        const { project } = this.props;
        if(!project)
            return null;
        return (
            <Container>
                <Card>
                    <CardText>
                        <h2>{project.name}</h2>
                    </CardText>
                </Card>
                <br />
            </Container>
        );
    }
    renderStoryboard() {
        const { storyboard } = this.props;
        if (!storyboard)
            return null;
        return (
            <Container>
                <Card>
                    <CardText>
                        <h3>{storyboard.name}</h3>
                    </CardText>
                    <CardText>
                        { this.renderPanels() }
                    </CardText>
                </Card>
                <br />
            </Container>
        );
    }

    renderPanels() {
        const { project, storyboard, history, securityContext } = this.props;
        const { clickPanelDetailButton } = this;
        if (!storyboard)
            return null;
        const renderEditButton = (project, securityContext) => {
            if (project.user_id == securityContext.id) {
                return (
                    <IconButton title="Edit">
                        <Badge
                            badgeContent={''}
                        >
                            <ContentCreate />
                        </Badge>
                    </IconButton>
                )
            }
            return null;
        };

        const nodes = storyboard.panels.map(function (panel, i) {
            return (
                <GridTile
                    key={i}
                    title={ i }
                    titlePosition='top'
                    titleStyle={{color:'#fff'}}
                    titleBackground='rgba(0, 0, 0, 0)'
                >
                    <Card>
                        <CardMedia>
                            <a>
                                <PanelImage panel={ panel } />
                            </a>
                        </CardMedia>
                        <CardActions>
                            <div className="row" style={{textAlign: 'center'}}>
                                <div className="col-sm-2" style={{ textAlign: 'right' }}>
                                    <IconButton title="Comments" onClick={() => { clickPanelDetailButton(i, panel, 'comments') }}>
                                        <Badge
                                            badgeContent={panel.comments.length}
                                            primary={true}
                                        >
                                            <CommunicationForum />
                                        </Badge>
                                    </IconButton>
                                </div>
                                <div className="col-sm-2" style={{ textAlign: 'right' }}>
                                    <IconButton title="Revisions" onClick={() => { clickPanelDetailButton(i, panel, 'revisions') }}>
                                        <Badge
                                            badgeContent={panel.revisions.length}
                                            primary={true}
                                        >
                                            <ImagePhotoLibrary />
                                        </Badge>
                                    </IconButton>
                                </div>
                                <div className="col-sm-2" style={{ textAlign: 'right' }} onClick={() => { clickPanelDetailButton(i, panel, 'script') }}>
                                    <IconButton title="Panel Script">
                                        <Badge
                                            badgeContent={''}
                                        >
                                            <AvMovie />
                                        </Badge>
                                    </IconButton>
                                </div>
                                { renderEditButton(project, securityContext) }
                            </div>
                        </CardActions>
                    </Card>
                </GridTile>
            );
        });
        return (
            <GridList
                cols={ 2 }
                padding={ 10 }
                cellHeight={ 'auto' }
            >
                {nodes}
            </GridList>
        );
    }
    renderPanelDetailDrawer() {
        const { securityContext } = this.props;
        const { panelDetailItem } = this.state;
        const { setState, onAddPanelComment } = this;

        if (panelDetailItem) {
            const renderDetails = (panelDetailItem) => {
                if (panelDetailItem.type == 'comments') {
                    return (
                        <Card>
                            <CardText>
                                <h2>Panel {panelDetailItem.index} Comments</h2>
                            </CardText>
                            <CardMedia>
                                <PanelImage panel={panelDetailItem.panel} maxWidth={640} />
                            </CardMedia>
                            <CardText>
                                <PanelComments panel={panelDetailItem.panel} securityContext={securityContext} onAddPanelComment={onAddPanelComment} />
                            </CardText>
                        </Card>
                    )
                }
                if (panelDetailItem.type == 'revisions') {
                    return (
                        <Card>
                            <CardText>
                                <h2>Panel {panelDetailItem.index} Revisions</h2>
                            </CardText>
                            <CardMedia>
                                <PanelImage panel={panelDetailItem.panel} maxWidth={640}/>
                            </CardMedia>
                            <CardText>
                                <PanelRevisions panel={panelDetailItem.panel} />
                            </CardText>
                        </Card>
                    )
                }
                if (panelDetailItem.type == 'script') {
                    console.log(panelDetailItem);
                    return (
                        <Card>
                            <CardText>
                                <h2>Panel {panelDetailItem.index} Script</h2>
                            </CardText>
                            <CardMedia>
                                <PanelImage panel={panelDetailItem.panel} maxWidth={ 640  } />
                            </CardMedia>
                            <CardText>
                                <ScriptPrintPreview script={ panelDetailItem.panel.script || '' } />
                            </CardText>
                        </Card>
                    )
                }
            };

            return <Drawer
                open={true}
                docked={false}
                width={ '100%' }
                onRequestChange={(open) => {
                    if (open === false) {
                        this.setState({ panelDetailItem: null })
                    }
                }}
            >
                <br />
                <Container>
                    {renderDetails(panelDetailItem)}
                </Container>
            </Drawer>
        }
        return null;
    }
    render() {
        const { ui_state } = this.props;
        return (
            <UiStateContainer uiState={ui_state} >
                { this.renderProject() }
                {this.renderStoryboard()}
                {this.renderPanelDetailDrawer()}
            </UiStateContainer>
        );
    }
};

const mapStateToProps = (state) => {
    const { ui_state, project, storyboard } = state.projectStoryboardReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        project,
        storyboard
    }
}

export default connect(mapStateToProps)(ProjectStoryboard);