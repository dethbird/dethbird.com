import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';


class NavigationHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <MenuItem onClick={this.handleClose}>Wunderlist</MenuItem>
                    <MenuItem onClick={this.handleClose}>Pocket</MenuItem>
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
