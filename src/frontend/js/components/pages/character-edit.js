import React from 'react';

import InternalLayout from 'components/layout/internal';
import CharacterForm from 'components/form/character-form';


const CharacterEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <CharacterForm id={ id } />
            </InternalLayout>
        );
    }
})

export default CharacterEdit;
