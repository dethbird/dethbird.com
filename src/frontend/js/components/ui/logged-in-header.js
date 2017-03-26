import React from 'react';
import {
    Button,
    Container,
    Item,
    Label,
    Menu,
    Segment
} from 'semantic-ui-react';

const LoggedInHeader = React.createClass({
    propTypes: {
        path: React.PropTypes.string,
        securityContext: React.PropTypes.object.isRequired
    },
    renderSecurityContext(){
        const { securityContext } = this.props;

        return (
            <Container textAlign="right" fluid={ true }>
                <Label as='a' image color="black">
                    <img src={ securityContext.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                    {  securityContext.username }
                </Label>
                <Button as="a" onClick={ () => { window.location.href = "/logout"} } basic color="grey" size="mini">Logout</Button>
            </Container>
        );
    },
    render() {
        const { path } = this.props;
        return (
            <Segment inverted={ true } >
                <Container>
                    <Menu size="large" inverted={ true } secondary={ true }>
                        <Item as="a" content="Dashboard" className={ path=="dashboard" ? "active" : null } />
                        <Item as="a" content="Projects" className={ path=="projects" ? "active" : null } />
                        <Item as="a" content="Scripts" className={ path=="scripts" ? "active" : null } />
                        <Item as="a" content="Characters" className={ path=="characters" ? "active" : null } />
                        <Item content={ this.renderSecurityContext() } className="right" />
                    </Menu>
                </Container>
            </Segment>
        )
    }
})

export default LoggedInHeader;
