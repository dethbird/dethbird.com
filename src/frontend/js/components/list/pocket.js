import React, { Component } from 'react';
import { connect } from 'react-redux';

import { forOwn } from 'lodash';

/** Material UI */
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { UI_STATE } from 'constants/ui-state';
import { getAllArticles } from 'actions/pocket';

import Container from 'components/layout/container';
import UiStateContainer from 'components/ui/ui-state-container';

class PocketList extends Component {
    constructor(props) {
        super(props);
        this.renderArticles = this.renderArticles.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getAllArticles());
    }
    renderArticles() {
        const { data } = this.props;
        if (!data)
            return null;

        let list = [];
        forOwn(data.list, function (item, i) { 
            list.push(item);
            return item; 
        });
        const nodes = list.map(function (item, i) {
            console.log(i);
            return (
                <ListItem 
                    key={i}
                    primaryText={item.resolved_title}
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
                    {this.renderArticles()}
                </List>
            </UiStateContainer>
        );
    }
};

const mapStateToProps = (state) => {
    const { ui_state, data } = state.pocketReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        data
    }
}

export default connect(mapStateToProps)(PocketList);
