import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PhaserContainer extends Component {
    componentDidMount() {
        const game = new Phaser.Game(800, 400, Phaser.AUTO, "phaser-container",
            {
                create: () => {},
                update: () => {}
            }
        );
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return <div id='phaser-container' />;
    }
};

PhaserContainer.propTypes = {
    layout: PropTypes.object.isRequired
};

export default PhaserContainer;
