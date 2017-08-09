import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UI_STATE } from 'constants/ui-state';
import { projectStoryboardGet } from 'actions/project-storyboard';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';

import Container from 'components/layout/container';
import PanelImage from 'components/ui/panel-image';
import UiStateContainer from 'components/ui/ui-state-container';

import { tokenizeScript, millisecondsToDuration } from 'utility/script-utils';


class ProjectStoryboard extends Component {
    constructor(props) {
        super(props);
        this.state = { openPanel: null };
        this.renderProject = this.renderProject.bind(this);
        this.renderStoryboard = this.renderStoryboard.bind(this);
        this.renderPanels = this.renderPanels.bind(this);
        this.setOpenPanel = this.setOpenPanel.bind(this);
        this.renderPanelDrawer = this.renderPanelDrawer.bind(this);
    }
    setOpenPanel(panelId) {
        this.setState({openPanel: panelId});
    }
    componentWillMount() {
        const { dispatch, match } = this.props;
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
        const { storyboard, history } = this.props;
        const { setOpenPanel } = this;
        const { openPanel } = this.state;
        const that = this;
        if (!storyboard)
            return null;

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
                            <a onClick={ ()=> { setOpenPanel(panel) } }>
                                <PanelImage panel={ panel } />
                            </a>
                        </CardMedia>
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
    renderPanelDrawer() {
        const { openPanel } = this.state;
        const { setState } = this;
        if (openPanel) {
            return <Drawer
                open={true}
                docked={false}
                width={ '95%' }
                onRequestChange={(open) => {
                    if (open === false) {
                        this.setState({ openPanel: null })
                    }
                }}
            >
                farts
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
                {this.renderPanelDrawer()}
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

/**

                            <Drawer
                                open={ openPanel === panel.id }
                                docked={ false }
                                width={ '100%' }
                                onRequestChange={(open)=>{
                                    if(open===false){
                                        that.setState({openPanel: null})
                                    }
                                }}
                            >
                                farts
                            </Drawer>
 */