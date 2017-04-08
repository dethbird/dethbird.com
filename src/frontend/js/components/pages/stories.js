import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import StoriesList from 'components/ui/list/stories-list';
import LoggedInHeader from 'components/ui/logged-in-header';
import Footer from 'components/ui/footer';


const Stories = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <StoriesList />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default Stories;
