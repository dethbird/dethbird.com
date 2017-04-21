import React from 'react';
import {
    Button,
    Container,
    Header,
    Image,
    Menu,
    Segment
} from 'semantic-ui-react';

import ExternalMainMenu from 'components/ui/menu/external-main-menu';

const Masthead = React.createClass({
    propTypes: {
        onClickLogin: React.PropTypes.func.isRequired
    },
    render() {
        const { onClickLogin } = this.props;

        return (
            <Segment inverted={ true } className="masthead">
                <Container>
                    <ExternalMainMenu onClickLogin={ onClickLogin }/>
                </Container>
                <Container text={ true } textAlign="center">
                    <Image src="/svg/storystation.svg" className="logo"/>
                    <Header as='h2' inverted={ true }>Get that story written and produced.</Header>
                    <Button content='Get Started' icon='right arrow' labelPosition='right' primary={ true } size="huge"/>
                </Container>
            </Segment>
        )
    }
})

export default Masthead;
