import React from 'react';
import {
    Button,
    Container,
    Menu,
    Segment
} from 'semantic-ui-react';

const Index = React.createClass({
    render() {
        const { securityContext } = this.props.route.props;
        return (
            <Segment.Group>
                <Segment inverted={ true } className="masthead">
                    <Container>
                        <Menu size="large" secondary={ true } inverted={ true } pointing={ true }>
                            <Menu.Item active={ true }>One</Menu.Item>
                            <Menu.Item>Two</Menu.Item>
                            <Menu.Item as="div" className="right">
                                <Button inverted={ true }>Login</Button>
                                <Button inverted={ true }>Signup</Button>
                            </Menu.Item>
                        </Menu>
                    </Container>
                </Segment>
                <Segment>index</Segment>
                <Segment inverted={ true }>index</Segment>
            </Segment.Group>
        )
    }
})

export default Index;
