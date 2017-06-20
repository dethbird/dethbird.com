import React from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    Container,
    Header,
    Icon,
    Image,
    Label,
    Menu,
    Segment
} from 'semantic-ui-react';

import ExternalMainMenu from 'components/ui/menu/external-main-menu';

const Masthead = React.createClass({
    propTypes: {
        path: React.PropTypes.string,
        onClickLogin: React.PropTypes.func.isRequired,
        securityContext: React.PropTypes.object.isRequired
    },
    render() {
        const { path, onClickLogin, securityContext } = this.props;

        return (
            <Segment inverted={ true } className="masthead">
                <Label color='yellow' size='large' attached='top left'>Beta</Label>
                <Container>
                    <ExternalMainMenu onClickLogin={ onClickLogin } path={ path } securityContext={ securityContext }/>
                </Container>
                <Container text={ true } textAlign="center">
                    <Image src="/svg/storystation.svg" className="logo"/>
                    <Header as='h2' inverted={ true }>Start writing your script <Icon name="pointing right"/></Header>
                    <Button content='Apply for Beta Access' icon='right arrow' labelPosition='right' color="yellow" size="huge" onClick={()=>{ browserHistory.push('/private-beta')}} />
                </Container>
            </Segment>
        )
    }
})

export default Masthead;
