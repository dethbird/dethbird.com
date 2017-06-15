import React from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    Container,
    Header
} from 'semantic-ui-react';

import InternalLayout from 'components/layout/internal';


const Welcome = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <Container textAlign="center">
                    <Header className="display-header">Welcome to StoryStation, { securityContext.username }!</Header>
                </Container>
                <Container text>
                    <p>Let's get started by creating your first <code>Project</code>.</p>
                    <Header as="h3">Why create a <code>Project</code>?</Header>
                    <ul>
                        <li>A <code>Project</code> contains all the assets/elements of your narrative masterpiece including characters, scripts, etc.</li>
                        <li>A <code>Project</code> will be used to generate your <code>ProjectPitch</code> once you have fleshed out your characters and stories/episodes.</li>
                    </ul>
                    <Container textAlign='center'>
                        <Button as="a" icon="add" labelPosition='right' color='green' content='Create a Project' size='large' onClick={()=>{browserHistory.push(`/project/create`)}}/>
                    </Container>
                </Container>
            </InternalLayout>
        )
    }
})

export default Welcome;
