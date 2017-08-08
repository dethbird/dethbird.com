import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UI_STATE } from 'constants/ui-state';
import { projectStoryboardGet } from 'actions/project-storyboard';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import Container from 'components/layout/container';
import UiStateContainer from 'components/ui/ui-state-container';

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
        const { storyboard } = this.props;
        if (!storyboard)
            return null;

        let panels = storyboard.panels;
        let rows = [];
        while (panels.length > 0){
            rows.push(panels.splice(0, 4));
        }

        const nodes = rows.map(function(row, i){
            const panelNodes = row.map(function(panel, j){
                return (
                    <div className="col-xs-3" key={ j }>
                        {panel.id}
                    </div>
                );
            });
            return (
                <div className="row" key={ i }>
                    { panelNodes }
                </div>
            );
        });     
        return nodes;
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
