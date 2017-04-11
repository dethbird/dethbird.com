import React from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    Segment
} from 'semantic-ui-react';

import StoryPlayer from 'components/ui/story-player';
import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/logged-in-header';


const StoryEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment basic>
                    <Button as="a" onClick={()=>{browserHistory.push(`/story/${id}/edit`)}}>Edit story</Button>
                </Segment>
                <Segment className="main-content">
                    <StoryPlayer id={ id } />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default StoryEdit;
