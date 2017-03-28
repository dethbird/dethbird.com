import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import CharacterForm from 'components/form/character-form';
import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/logged-in-header';


const CharacterEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <CharacterForm id={ id } />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default CharacterEdit;
