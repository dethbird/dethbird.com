import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { UI_STATE } from 'constants/ui-state';
import { projectsGet } from 'actions/projects'

import Container from 'components/layout/container';
import UiStateContainer from 'components/ui/ui-state-container';

class Projects extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(projectsGet());
    }
    renderStoryboards(storyboards) {
        return storyboards.map(function(model,i){
            return <Paper key={ i }>
                <Container>
                    { model.name }
                </Container>
            </Paper>
        });
    }
    renderProjects() {
        const { models } = this.props;
        const { renderStoryboards } = this;
        if (!models)
            return null;
        const nodes = models.map(function(model, i){
            console.log(model.storyboards);
            return (
                <Container key={i}>
                    <Card>
                        <CardTitle><h2>{model.name}</h2></CardTitle>
                        <CardText>
                            <h4>Storyboards</h4>
                            { renderStoryboards(model.storyboards) }
                        </CardText>
                    </Card>
                    <br />
                </Container>
            );
        });
        return nodes;
    }
    render() {
        const { ui_state } = this.props;
        return (
            <UiStateContainer uiState = { ui_state } >
                { this.renderProjects() }
            </UiStateContainer>
        );
    }
};

const mapStateToProps = (state) => {
    const { ui_state, models } = state.projectsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        models
    }
}

export default connect(mapStateToProps)(Projects);
