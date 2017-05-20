import React from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    Container,
    Dropdown,
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
    renderAdminUsersMenuItem() {
        const { securityContext } = this.props;
        const { path } = this.props;

        if(securityContext.admin_user!==1)
            return null;
        return (
            <Item as="a" onClick={()=>{browserHistory.push('/admin/users')}} className={ ['admin/users', 'admin/user/:id/edit', 'admin/user/create'].indexOf(path) > -1 ? "active" : null } content="Users"/>
        )
    },
    render() {
        const { renderAdminUsersMenuItem } = this;
        const { path } = this.props;
        return (
            <Segment inverted={ true } >
                <Container fluid>
                    <Menu size="large" inverted={ true } secondary={ true }>
                        <Item as="a" content="Dashboard" className={ path=="dashboard" ? "active" : null } onClick={ (e) => { browserHistory.push('/dashboard'); } }/>
                        <Item as="a" content="Projects" className={ ['projects', 'project/:id', 'project/:id/edit', 'project/create'].indexOf(path) > -1 ? "active" : null } onClick={ (e) => { browserHistory.push('/projects'); } }/>
                        <Item as="a" content="Stories" className={ ['stories', 'story/:id/edit', 'story/create'].indexOf(path) > -1 ? "active" : null } onClick={ (e) => { browserHistory.push('/stories'); } }/>
                        <Item as="a" content="Characters" className={ ['characters', 'character/:id/edit', 'character/create'].indexOf(path) > -1 ? "active" : null } onClick={ (e) => { browserHistory.push('/characters'); } }/>
                        {  renderAdminUsersMenuItem() }
                        <Item content={ this.renderSecurityContext() } className="right" />
                    </Menu>
                </Container>
            </Segment>
        )
    }
})

export default LoggedInHeader;
