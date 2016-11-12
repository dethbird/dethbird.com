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
import { Description } from '../ui/description'
import { Fountain } from '../ui/fountain'
import { Image } from "../ui/image"
import InputDescription from '../ui/input-description'
import { Section } from "../ui/section"
import UiState from '../ui/ui-state'

import {
    StoryboardBreadcrumb
} from "./storyboard/storyboard-breadcrumb"
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../../constants/form';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import {
    getStoryboard,
    postStoryboard,
    putStoryboard,
    resetStoryboard,
    reorderStoryboardRevisions
} from  '../../actions/storyboard'


const StoryboardEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                name: null,
                description: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { storyboard } = this.props;
        if( storyboard==undefined && nextProps.storyboard){
            this.setState({
                changedFields: {
                    name: nextProps.storyboard.name,
                    description: nextProps.storyboard.description
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, storyboardId } = this.props.params;
        dispatch(getStoryboard(projectId, storyboardId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, project, storyboard } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetStoryboard( project, storyboard, form_mode ));
    },
    handleClickCancel(event) {
        const { projectId, storyboardId } = this.props.params;
        event.preventDefault()
        browserHistory.push(
            `/project/${projectId}`
        )
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, project, storyboard } = this.props;
        const { changedFields } = this.state;
        if(form_mode == FORM_MODE_ADD)
            dispatch(postStoryboard(project, storyboard, changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putStoryboard( project, storyboard, changedFields));
    },
    handleSort(items) {
        const { dispatch, form_mode, project, storyboard } = this.props;
        const { changedFields } = this.state;

        let newStoryboard = changedFields;
        newStoryboard.panels = items;

        items = items.map(function(item, i){
            return (
                { 'id': item.id }
            );
        });

        dispatch(reorderStoryboardRevisions(project, newStoryboard, form_mode, items));

    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, project, storyboard } = this.props;
        const getErrorForId = (id) => {
            const error = _.findWhere(errors, {
                'property': id
            });
            if(error)
                return error.message
            return null;
        };

        let sortableNode;
        if (storyboard) {
            let panelNodes;
            if (storyboard.panels) {
                panelNodes = storyboard.panels.map(function(panel, i) {
                    let src;
                    if (panel.revisions.length)
                        src = panel.revisions[0].content
                    return (
                        <SortableItem
                            key={ panel.id }
                            className="col-xs-3"
                        >
                            <Card>
                                <Image src={ src } />
                                <Fountain source={ panel.script } />
                            </Card>
                        </SortableItem>
                    );
                });

                sortableNode = (
                    <div>
                        <Section title="Panels" subtitle="Drag to reorder" count={ storyboard.panels.length }></Section>

                        <SortableItems
                            items={ storyboard.panels }
                            onSort={ this.handleSort }
                            name="sort-revisions-component"
                        >
                            { panelNodes }
                        </SortableItems>
                    </div>
                );
            }
        }

        return (
            <div>
                <StoryboardBreadcrumb { ...this.props } />

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
                        label="Description"
                        id="description"
                        value={ changedFields.description || '' }
                        onChange= { this.handleFieldChange }
                        errorText={ getErrorForId('description') }
                    />

                    <Card className='input-card'>
                        <CardText>
                            <Description source={ changedFields.description }  />
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
    const { ui_state, form_mode, errors, project, storyboard } = state.storyboard;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        errors,
        project,
        storyboard
    }
}

export default connect(mapStateToProps)(StoryboardEdit);
