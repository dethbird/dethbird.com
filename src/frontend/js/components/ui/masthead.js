import React from 'react';
import {
    Button,
    Container,
    Menu,
    Segment
} from 'semantic-ui-react';

const Masthead = React.createClass({
    propTypes: {
        onClickLogin: React.PropTypes.func.isRequired
    },
    render() {
        const { onClickLogin } = this.props;

        return (
            <Segment inverted={ true } className="masthead">
                <Container>
                    <Menu size="large" secondary={ true } inverted={ true } pointing={ true }>
                        <Menu.Item active={ true }>One</Menu.Item>
                        <Menu.Item>Two</Menu.Item>
                        <Menu.Item as="div" className="right">
                            <Button inverted={ true } onClick={ onClickLogin }>Login</Button>
                            <Button inverted={ true }>Signup</Button>
                        </Menu.Item>
                    </Menu>
                </Container>
            </Segment>
        )
    }
})

export default Masthead;
