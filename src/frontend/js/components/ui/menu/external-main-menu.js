import React from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    Menu
} from 'semantic-ui-react';

const ExternalMainMenu = React.createClass({
    propTypes: {
        onClickLogin: React.PropTypes.func.isRequired
    },
    render() {
        const { onClickLogin } = this.props;
        return (
            <Menu size="large" secondary={ true } inverted={ true } pointing={ true }>
                <Menu.Item active={ true } onClick={()=>{browserHistory.push('/')}} >Overview</Menu.Item>
                <Menu.Item>Demo</Menu.Item>
                <Menu.Item>Docs</Menu.Item>
                <Menu.Item onClick={()=>{browserHistory.push('/newsfeed')}}>Animation & Showbiz News</Menu.Item>
                <Menu.Item as="div" className="right">
                    <Button inverted={ true } onClick={ onClickLogin }>Login</Button>
                    <Button inverted={ true }>Signup</Button>
                </Menu.Item>
            </Menu>
        )
    }
})

export default ExternalMainMenu;
