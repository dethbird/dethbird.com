import React from 'react'
import {
    SortableItems,
    SortableItem
} from 'react-sortable-component'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { CardActions, CardText } from 'material-ui/Card';

import InputText from '../ui/input-text'

import { Card } from '../ui/card'
import { ButtonsForm } from '../ui/buttons-form'
import { FountainFull } from '../ui/fountain-full'
import { Image } from "../ui/image"
import InputDescription from '../ui/input-description'
import { Section } from "../ui/section"
import UiState from '../ui/ui-state'

import {
    StoryboardPanelBreadcrumb
} from "./storyboard-panel/storyboard-panel-breadcrumb"
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../../constants/form';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import {
    getStoryboardPanel,
    postStoryboardPanel,
    putStoryboardPanel,
    resetStoryboardPanel,
    reorderStoryboardPanelRevisions
} from  '../../actions/storyboard-panel'


const StoryboardPanelEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                name: null,
                script: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { panel } = this.props;
        if( panel==undefined && nextProps.panel){
            this.setState({
                changedFields: {
                    name: nextProps.panel.name,
                    script: nextProps.panel.script
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, storyboardId, panelId } = this.props.params;
        dispatch(getStoryboardPanel(projectId, storyboardId, panelId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, project, storyboard, panel } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetStoryboardPanel( project, storyboard, panel, form_mode ));
    },
    handleClickCancel(event) {
        const { projectId, storyboardId, panelId } = this.props.params;
        event.preventDefault()
        browserHistory.push(
            `/project/${projectId}/storyboard/${storyboardId}`
        )
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project, storyboard, panel } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postStoryboardPanel(project, storyboard, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putStoryboardPanel( project, storyboard, panel, changedFields));
    },
    handleSort(items) {
        const { dispatch, form_mode, project, storyboard, panel } = this.props;
        const { changedFields } = this.state;

        let newPanel = changedFields;
        newPanel.revisions = items;

        items = items.map(function(item, i){
            return (
                { 'id': item.id }
            );
        });

        dispatch(reorderStoryboardPanelRevisions(project, storyboard, newPanel, form_mode, items));

    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, project, storyboard, panel } = this.props;
        const getErrorForId = (id) => {
            const error = _.findWhere(errors, {
                'property': id
            });
            if(error)
                return error.message
            return null;
        };

        let sortableNode;
        if (panel) {
            let panelRevisionNodes;
            if (panel.revisions) {
                panelRevisionNodes = panel.revisions.map(function(revision, i) {
                    return (
                        <SortableItem
                            key={ revision.id }
                            className="content-secondary"
                        >
                            <Card>
                                <Image src={ revision.content } />
                            </Card>
                        </SortableItem>
                    );
                });

                sortableNode = (
                    <div>
                        <Section title="Revisions" subtitle="Drag to reorder" count={ panel.revisions.length } className='content-primary'></Section>

                        <SortableItems
                            items={ panel.revisions }
                            onSort={ this.handleSort }
                            name="sort-revisions-component"
                            className='content-primary'
                        >
                            { panelRevisionNodes }
                        </SortableItems>
                    </div>
                );
            }
        }

        return (
            <div>
                <StoryboardPanelBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <form>

                    <InputText
                        label="Name"
                        id="name"
                        value={ changedFields.name || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('name') }
                    />

                    <InputDescription
                        label="Script"
                        id="script"
                        value={ changedFields.script || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('script') }
                    />

                    <Card className='input-card'>
                        <CardText>
                            <FountainFull source={ changedFields.script }  />
                        </CardText>
                    </Card>

                    <ButtonsForm
                        handleClickCancel={ this.handleClickCancel }
                        handleClickSubmit={ this.handleClickSubmit }
                    />

                    { sortableNode }

                </form>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    const { ui_state, form_mode, errors, project, storyboard, panel } = state.storyboardPanel;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        errors,
        project,
        storyboard,
        panel
    }
}

export default connect(mapStateToProps)(StoryboardPanelEdit);
