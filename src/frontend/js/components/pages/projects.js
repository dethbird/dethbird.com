import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { UI_STATE } from 'constants/ui-state';
import { projectsGet } from 'actions/projects'

import Container from 'components/layout/container';
import UiStateContainer from 'components/ui/ui-state-container';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.renderStoryboards = this.renderStoryboards.bind(this);
        this.renderProjects = this.renderProjects.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(projectsGet());
    }
    renderStoryboards(storyboards) {
        const { history } = this.props;
        return storyboards.map(function(model,i){
            return <div className="col-xs-3" key={ i }>
                <Card>
                    <CardTitle>
                        { model.name }
                    </CardTitle>
                    <CardActions>
                        <FlatButton label="Details" primary fullWidth onTouchTap={() => { history.push(`/project/${model.project_id}/storyboard/${model.id}`)}}/>
                    </CardActions>
                </Card>
            </div>
        });
    }
    renderProjects() {
        const { models } = this.props;
        const { renderStoryboards } = this;
        if (!models)
            return null;
        const nodes = models.map(function(model, i){
            return (
                <Container key={i}>
                    <Card>
                        <CardTitle><h2>{model.name}</h2></CardTitle>
                        <CardText>
                            <h4>Storyboards</h4>
                            <Container>
                                { renderStoryboards(model.storyboards) }
                            </Container>
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
