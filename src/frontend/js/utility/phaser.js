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
        rotations: [],
        sin_wobbles: []
    };

    forEach(layout.elements, function (element, i) {
        if (element.type == 'image') {
            if (has(element, 'animations')) {
                if (element.animations.length > 0) {
                    forEach(element.animations, function(anim, i) {
                        if (anim.type === 'rotation') {
                            const sprite = game.add.sprite(element.position.left, element.position.top, element.id);
                            const scale = parseInt(element.dimensions.width) / sprite.width;
                            sprite.width = sprite.width * scale;
                            sprite.height = sprite.height * scale;
                            sprite.anchor.setTo(0.5, 0.5);
                            sprite.x = sprite.x + sprite.width / 2;
                            sprite.y = sprite.y + sprite.height / 2;
                            gameState.animations.rotations.push({
                                properties: anim.properties,
                                sprite
                            });
                        }
                        if (anim.type === 'sin_wobble') {
                            const waveform = game.add.tween({ x: 0 })
                                .to({ x: anim.properties.distance_x }, 3000, "Bounce.easeInOut", true, 0, -1, true)
                                .generateData(60);

                            const sprites = game.add.spriteBatch();
                            const w = game.cache.getImage(element.id).width;
                            const h = game.cache.getImage(element.id).height;
                            const ys = anim.properties.slice_height;
                            const scale = parseInt(element.dimensions.width) / w;

                            let slices = [];
                            for (var y = 0; y < Math.floor(h / ys); y++) {
                                const slice = game.make.sprite(element.position.left, element.position.top + (y * ys), element.id);
                                // slice.width = slice.width * scale;
                                // slice.height = slice.height * scale;
                                // slice.anchor.setTo(0.5, 0.5);
                                // slice.x = slice.x + slice.width / 2;
                                // slice.y = slice.y + slice.height / 2;
                                slice.crop(new Phaser.Rectangle(0, y * ys, w, ys));
                                slice.ox = slice.x;
                                slice.cx = game.math.wrap(y * 2, 0, (waveform.length - 1));
                                // slice.anchor.set(0.5);
                                sprites.addChild(slice);
                                slices.push(slice);
                            }
                            slices.scale = scale;
                            gameState.animations.sin_wobbles.push({
                                properties: { ... anim.properties, waveform },
                                sprites: slices
                            });
                        }
                    });
                }
            } else {
                const sprite = game.add.sprite(element.position.left, element.position.top, element.id);
                const scale = parseInt(element.dimensions.width) / sprite.width;
                sprite.width = sprite.width * scale;
                sprite.height = sprite.height * scale;
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

    forEach(gameState.animations.rotations, function(anim, i) {
        anim.sprite.angle += anim.properties.speed;
    });

    forEach(gameState.animations.sin_wobbles, function (anim, i) {
        for (var i = 0, len = anim.sprites.length; i < len; i++) {
            anim.sprites[i].x = anim.sprites[i].ox + anim.properties.waveform[anim.sprites[i].cx].x;

            anim.sprites[i].cx++;

            if (anim.sprites[i].cx > (anim.properties.waveform.length -1)) {
                anim.sprites[i].cx = 0;
            }

        }
    });
}