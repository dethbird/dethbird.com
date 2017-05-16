import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Container,
    Loader
} from 'semantic-ui-react';

import UsersFilter from 'components/ui/list/filter/users-filter';
import UserCard from 'components/ui/card/user-card';
import { UI_STATE } from 'constants/ui-state';
import { usersGet } from 'actions/user';

const UsersList = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(usersGet());
    },
    handleFilter(e, payload) {
        const { dispatch } = this.props;
        dispatch(usersGet(payload));
    },
    render() {
        const { handleFilter } = this;
        const { models } = this.props;


        const userNodes = models ? models.map(function(user, i){
            return (
                <UserCard user={ user } key={ i } />
            );
        }) : <Loader active />;

        return (
            <Container>
                <UsersFilter onFilter={ handleFilter } />
                <Card.Group itemsPerRow={ 4 } >
                    { userNodes }
                </Card.Group>
            </Container>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.usersReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(UsersList);
