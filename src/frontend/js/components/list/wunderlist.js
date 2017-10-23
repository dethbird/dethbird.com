import React, { Component } from 'react';
import { connect } from 'react-redux';

import { find } from 'lodash';

/** Material UI */
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { UI_STATE } from 'constants/ui-state';
import { getAllTasks } from 'actions/wunderlist';

import Container from 'components/layout/container';
import UiStateContainer from 'components/ui/ui-state-container';

class WunderlistList extends Component {
    constructor(props) {
        super(props);
        this.renderTasks = this.renderTasks.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getAllTasks());
    }
    renderTasks() {
        const { data } = this.props;
        if (!data)
            return null;
        const nodes = data.tasks.map(function (task, i) {
            console.log(task);
            const list = find(data.lists, { id: parseInt(task.list_id) });
            console.log(list);
            return (
                <ListItem 
                    key={i}
                    primaryText={task.title}
                    secondaryText={list.title}
                    children={<div>{ task.due_date }</div>}
                />
            );
        });
        return nodes;
    }
    render() {
        const { ui_state } = this.props;
        return (
            <UiStateContainer uiState={ui_state} >
                <List>
                    {this.renderTasks()}
                </List>
            </UiStateContainer>
        );
    }
};

const mapStateToProps = (state) => {
    const { ui_state, data } = state.wunderlistReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        data
    }
}

export default connect(mapStateToProps)(WunderlistList);
