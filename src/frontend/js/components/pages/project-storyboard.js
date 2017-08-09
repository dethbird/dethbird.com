import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UI_STATE } from 'constants/ui-state';
import { projectStoryboardGet } from 'actions/project-storyboard';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';

import Container from 'components/layout/container';
import PanelImage from 'components/ui/panel-image';
import UiStateContainer from 'components/ui/ui-state-container';

import { tokenizeScript, millisecondsToDuration } from 'utility/script-utils';


class ProjectStoryboard extends Component {
    constructor(props) {
        super(props);
        this.renderProject = this.renderProject.bind(this);
        this.renderStoryboard = this.renderStoryboard.bind(this);
        this.renderPanels = this.renderPanels.bind(this);
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
                            <a onClick={()=>{history.push(`/project/${storyboard.project_id}/storyboard/${storyboard.id}/panel/${panel.id}`)}}>
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
    render() {
        const { ui_state } = this.props;
        return (
            <UiStateContainer uiState={ui_state} >
                { this.renderProject() }
                { this.renderStoryboard() }
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
