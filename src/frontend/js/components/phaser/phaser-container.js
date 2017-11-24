import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
    createFromLayout,
    preloadFromLayout,
    updateFromLayout 
} from 'utility/phaser';

let game;
let gameState = {};

class PhaserContainer extends Component {
    componentDidMount() {
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "phaser-container",
            {
                preload: (game) => { preloadFromLayout(game, layout) },
                create: (game) => { createFromLayout(game, layout, gameState) },
                update: (game) => { updateFromLayout(game, layout, gameState) }
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
