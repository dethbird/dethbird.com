import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Devices from 'material-ui/svg-icons/device/devices';


class Index extends Component {
    render() {
        return (
            <div>
                <FlatButton icon={<Devices />} label='Projects' />
            </div>
        );
    }
};

export default Index;
