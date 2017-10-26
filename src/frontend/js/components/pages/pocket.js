import React, { Component } from 'react';

import Container from 'components/layout/container';

import PocketList from 'components/list/pocket';


class Pocket extends Component {
    render() {
        return (
            <Container>
                <PocketList />
            </Container>
        );
    }
};

export default Pocket;
