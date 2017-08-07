import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UI_STATE } from 'constants/ui-state';
import { projectStoryboardGet } from 'actions/project-storyboard';

import Container from 'components/layout/container';
import UiStateContainer from 'components/ui/ui-state-container';

class ProjectStoryboard extends Component {
    constructor(props) {
        super(props);
        this.renderProject = this.renderProject.bind(this);
        this.renderStoryboard = this.renderStoryboard.bind(this);
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
        return <div>{ project.name }</div>
    }
    renderStoryboard() {
        const { storyboard } = this.props;
        if (!storyboard)
            return null;
        return <div>{storyboard.name}</div>
    }
    render() {
        const { ui_state } = this.props;
        return (
            <UiStateContainer uiState={ui_state} >
                <Container>
                    { this.renderProject() }
                    { this.renderStoryboard() }
                </Container>
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
