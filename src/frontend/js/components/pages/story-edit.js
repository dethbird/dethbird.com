import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import StoryForm from 'components/form/story-form';
import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/header/logged-in-header';


const StoryEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id, projectId } = this.props.params;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <StoryForm id={ id } projectId={ projectId } className="main-content"/>
                <Footer />
            </Segment.Group>
        );
    }
})

export default StoryEdit;
