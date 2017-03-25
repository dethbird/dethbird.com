import React from 'react';
import {
    Button,
    Container,
    Header,
    Image,
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
                <Container text={ true } >
                    <Image src="/svg/storystation.svg" className="logo"/>
                    <Header as='h2' inverted={ true }>The boring part of silver screen magic!</Header>
                    <Button content='Get Started' icon='right arrow' labelPosition='right' primary={ true } size="huge"/>
                </Container>
            </Segment>
        )
    }
})

export default Masthead;
