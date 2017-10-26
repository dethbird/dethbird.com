import React, { Component } from 'react';

import Container from 'components/layout/container';

import WunderlistList from 'components/list/wunderlist';


class Wunderlist extends Component {
    render() {
        return (
            <Container>
                <WunderlistList />
            </Container>
        );
    }
};

export default Wunderlist;
