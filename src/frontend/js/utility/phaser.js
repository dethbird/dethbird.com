import { forEach, has } from 'lodash';

export const preloadFromLayout = (game, layout) => {

    game.stage.backgroundColor = layout.canvas.background_color;

    game.world.resize(
        layout.canvas.dimensions.width,
        layout.canvas.dimensions.height
    );

    forEach(layout.elements, function(element, i) {
        if(element.type == 'image')
            game.load.image(element.id, element.src);
    });
}

export const createFromLayout = (game, layout, gameState = {}) => {
    gameState.animations = {
        rotations: []
    };
    forEach(layout.elements, function (element, i) {
        if (element.type == 'image') {
            const sprite = game.add.sprite(element.position.left, element.position.top, element.id);
            const scale = parseInt(element.dimensions.width) / sprite.width;
            sprite.width = sprite.width * scale;
            sprite.height = sprite.height * scale;
            if (has(element, 'animations')) {
                if (element.animations.length > 0) {
                    forEach(element.animations, function(anim, i) {
                        if (anim.type === 'rotation') {
                            sprite.anchor.setTo(0.5, 0.5);
                            sprite.x = sprite.x + sprite.width / 2;
                            sprite.y = sprite.y + sprite.height / 2;
                            gameState.animations.rotations.push({
                                properties: anim.properties,
                                sprite
                            });
                        }
                    });
                }
            }
        }
    });

    // cursor input
    if (layout.canvas.input.includes('cursor'))
        gameState.cursors = game.input.keyboard.createCursorKeys();

    // move camera with mouse flick
    if (layout.canvas.input.includes('flick')) {
        game.input.onUp.add((pointer) => {
            game.add.tween(game.camera)
                .to({
                    x: game.camera.x - (pointer.positionUp.x - pointer.positionDown.x),
                    y: game.camera.y - (pointer.positionUp.y - pointer.positionDown.y)
                }, 800, Phaser.Easing.Quadratic.Out).start();
        }, this);
    }
}

export const updateFromLayout = (game, layout, gameState) => {

    if (layout.canvas.input.includes('cursor')){
        if (gameState.cursors.left.isDown) {
            game.camera.x -= 4;
        }
        else if (gameState.cursors.right.isDown) {
            game.camera.x += 4;
        }
        else if (gameState.cursors.up.isDown) {
            game.camera.y -= 4;
        }
        else if (gameState.cursors.down.isDown) {
            game.camera.y += 4;
        }
    }

    forEach(gameState.animations.rotations, function(r, i) {
        r.sprite.angle += r.properties.speed;
    });
}