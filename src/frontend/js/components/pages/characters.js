import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import CharactersList from 'components/ui/list/characters-list';
import LoggedInHeader from 'components/ui/header/logged-in-header';
import Footer from 'components/ui/footer';


const Characters = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <CharactersList />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default Characters;
