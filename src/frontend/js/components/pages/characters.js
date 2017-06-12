import React from 'react';

import InternalLayout from 'components/layout/internal';
import CharactersList from 'components/ui/list/characters-list';


const Characters = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <CharactersList />
            </InternalLayout>
        );
    }
})

export default Characters;
