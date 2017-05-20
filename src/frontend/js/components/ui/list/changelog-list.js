import React from 'react';
import { connect } from 'react-redux';
import {
    Item,
    Loader
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { changelogGet } from 'actions/changelog';

import ChangelogItem from 'components/ui/list/item/changelog-item';

const ChangelogList = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(changelogGet());
    },
    render() {
        const { models } = this.props;

        if (!models)
            return <Loader active>Loading</Loader>;

        const nodes = models ? models.map(function(model, i){
            return (
                <ChangelogItem key={ i } item={ model } />
            );
        }) : [];

        return (
            <Item.Group divided>
                { nodes }
            </Item.Group>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.changelogReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(ChangelogList);
