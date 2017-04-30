import React from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    Label,
    Menu
} from 'semantic-ui-react';

const ExternalMainMenu = React.createClass({
    propTypes: {
        path: React.PropTypes.string,
        onClickLogin: React.PropTypes.func.isRequired,
        securityContext: React.PropTypes.object.isRequired
    },
    renderSecurityContext() {
        const { onClickLogin, securityContext } = this.props;

        if(securityContext.application_user==1) {
            return (
                <div>
                    <Button onClick={ onClickLogin } basic inverted>Login</Button>
                    <Button primary  onClick={()=>{ browserHistory.push('/private-beta')}}>Signup</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Label as='a' image color="black">
                        <img src={ securityContext.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                        {  securityContext.username }
                    </Label>
                    <Button as="a" onClick={ () => { browserHistory.push("/dashboard") } } primary size="mini">Dashboard</Button>
                    <Button as="a" onClick={ () => { window.location.href = "/logout"} } color="black" size="mini">Logout</Button>
                </div>
            )
        }
    },
    render() {
        const { renderSecurityContext } = this;
        const { path, onClickLogin } = this.props;
        return (
            <Menu size="large" secondary={ true } inverted={ true } pointing={ true }>
                <Menu.Item active={ !path } onClick={()=>{browserHistory.push('/')}} >Overview</Menu.Item>
                <Menu.Item
                    onClick={()=>{browserHistory.push('/product')}}
                    active={
                        path=='product'
                        || path=='product/demo/storyeditor'
                        || path=='product/demo/storyplayer'
                    }
                >
                    Product
                </Menu.Item>
                <Menu.Item onClick={()=>{browserHistory.push('/newsfeed')}} active={ path=='newsfeed' }>Animation & Showbiz News</Menu.Item>
                <Menu.Item as="div" className="right">
                    { renderSecurityContext()  }
                </Menu.Item>
            </Menu>
        )
    }
})

export default ExternalMainMenu;
