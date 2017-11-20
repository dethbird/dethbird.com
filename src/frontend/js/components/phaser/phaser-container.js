import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PhaserContainer extends Component {
    render() {
        return <div>phaser</div>;
    }
};

PhaserContainer.propTypes = {
    layout: PropTypes.object.isRequired
};

export default PhaserContainer;
