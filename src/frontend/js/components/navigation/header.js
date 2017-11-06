import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';


class NavigationHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    handleClickMenu = (path) => {
        const { history } = this.props;
        this.handleClose();
        history.push(path);
    }

    handleLogout = (path) => {
        this.handleClose();
        window.location.href = "/logout";
    }

    render() {
        const { securityContext } = this.props;
        const that = this;
        
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >

                    <MenuItem onClick={() => that.handleClickMenu('/wunderlist')}>Wunderlist</MenuItem>
                    <MenuItem onClick={() => that.handleClickMenu('/pocket')}>Pocket</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Drawer>
                <IconButton
                    onClick={this.handleToggle}
                >
                    <IconNavigationMenu />
                </IconButton>
            </div>
        );
    }
};

export default NavigationHeader;
