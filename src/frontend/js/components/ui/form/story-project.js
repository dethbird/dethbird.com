import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'underscore';
import {
    Button,
    Card,
    Dropdown,
    Modal
} from 'semantic-ui-react';

import ProjectCard from 'components/ui/card/project-card';
import { UI_STATE } from 'constants/ui-state';
import { projectsGet } from 'actions/project';

const StoryProject = React.createClass({
    propTypes: {
        projectId: React.PropTypes.string,
        demo: React.PropTypes.bool,
        onSelectProject: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            modalVisible: false,
            selectedOption: null
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(projectsGet());
    },
    toggleModalVisible() {
        this.setState({
            ... this.state,
            modalVisible: !this.state.modalVisible
        })
    },
    handleClickAddToProject(e) {
        const { toggleModalVisible } = this;
        const { onSelectProject } = this.props;
        const { selectedOption } = this.state;
        onSelectProject({currentTarget: { value: `${selectedOption}` } }, 'project_id');
        setTimeout(function(){
            toggleModalVisible();
        }, 0);
    },
    handleOnChange(e, payload) {

        this.setState({
            ... this.state,
            selectedOption: payload.value
        });
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            ... this.state,
            selectedOption: nextProps.projectId
        });
    },
    renderModal() {
        const { toggleModalVisible, handleOnChange, handleClickAddToProject } = this;
        const { models } = this.props;
        const { modalVisible, selectedOption } = this.state;

        if (!models)
            return null;

        const dropdownItems = models.map(function(model, i){
            return {
                value: model.id,
                text: model.name
            };
        });
        return (
            <Modal dimmer='blurring' open={modalVisible} onClose={ toggleModalVisible }>
                <Modal.Header>Select Project</Modal.Header>
                <Modal.Content>
                    <Dropdown
                        placeholder='Select a project'
                        search
                        fluid
                        selection
                        options= { dropdownItems }
                        onChange={ handleOnChange }
                        value={ selectedOption }
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button as="a" onClick={ toggleModalVisible }>Cancel</Button>
                    <Button as="a" positive icon='checkmark' labelPosition='right' content="Add to project" onClick={ handleClickAddToProject } disabled={ !selectedOption }/>
                </Modal.Actions>
            </Modal>
        )
    },
    render() {
        const { toggleModalVisible, renderModal } = this;
        const { projectId, models } = this.props;

        if (!projectId) {
            return (
                <div>
                    { renderModal() }
                    <Button basic as="a" size="mini" fluid onClick={ toggleModalVisible } >Add to project</Button>
                </div>
            )
        }

        const project = _.findWhere(models, { id: parseInt(projectId) });

        if (!project)
            return null;

        return (
            <div>
                { renderModal() }
                <div>{ project.name } <Button as="a" basic size="mini" className="right floated" onClick={ toggleModalVisible }>Change</Button></div>
            </div>
        )
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.projectsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(StoryProject);
