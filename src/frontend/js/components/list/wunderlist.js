import React, { Component } from 'react';
import { connect } from 'react-redux';

import { find, sortBy } from 'lodash';
import moment from 'moment';

/** Material UI */
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

/** Components */
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
        const tasks = sortBy(data.tasks, ['due_date']);
        
        const nodes = tasks.map(function (task, i) {
            const list = find(data.lists, { id: parseInt(task.list_id) });
            return (
                <ListItem 
                    key={i}
                    children={
                        <div className='item' key={i}>
                            <h3 className='item_prop item_title'>{ task.title }</h3>
                            <h5 className='item_prop item_subtitle subdued'>{list.title}</h5>
                            <div className='item_prop item_date'>{task.due_date}</div>
                        </div>

                    }
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
