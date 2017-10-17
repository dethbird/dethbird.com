import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Devices from 'material-ui/svg-icons/device/devices';

import Container from 'components/layout/container';


class Index extends Component {
    render() {
        return (
            <Container>
                <FlatButton icon={ <Devices />} label='Bookmark' />
            </Container>
        );
    }
};

export default Index;
