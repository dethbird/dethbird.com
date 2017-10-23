import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Devices from 'material-ui/svg-icons/device/devices';

import Container from 'components/layout/container';

import WunderlistList from 'components/list/wunderlist';


class Index extends Component {
    render() {
        return (
            <Container>
                <WunderlistList />
            </Container>
        );
    }
};

export default Index;
