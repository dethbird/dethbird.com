import { forEach, find, has } from 'lodash';

export const preloadFromLayout = (game, layout) => {

    game.stage.backgroundColor = layout.canvas.background_color;

    game.world.resize(
        layout.canvas.dimensions.width,
        layout.canvas.dimensions.height
    );

    forEach(layout.elements, function(element, i) {
        if (element.type == 'image' || element.type == 'emitter') {
            game.load.image(element.id, element.src);
        }
    });
}

export const createFromLayout = (game, layout, gameState) => {
    gameState.animations = {
        rotations: [],
        sin_wobbles: []
    };
    gameState.layers = [],
    gameState.cursors = {};
    gameState.pointer = {
        last_x: undefined,
        last_pinch_coefficient: undefined
    };
    gameState.parallax = {
        shift_x: 0,
        shift_y: 0
    };
    gameState.camera = {
        zoom: 1
    };

    forEach(layout.elements, function (element, i) {

        let layer;
        if (has(element, 'layer'))``
            layer = find(layout.layers, { id: element.layer.layer_id });

        if (element.type == 'image') {
            if (has(element, 'animations')) {
                if (element.animations.length > 0) {
                    forEach(element.animations, function(anim, i) {
                        if (anim.type === 'rotation') {
                            const sprite = game.add.sprite(element.position.left, element.position.top, element.id);
                            sprite.scale.set(parseInt(element.dimensions.width) / sprite.width);
                            sprite.anchor.setTo(0.5, 0.5);
                            sprite.x = sprite.x + sprite.width / 2;
                            sprite.y = sprite.y + sprite.height / 2;
                            gameState.animations.rotations.push({
                                properties: anim.properties,
                                sprite
                            });
                            if (layer !== undefined)
                                gameState.layers.push({
                                    sprite,
                                    layer,
                                    element,
                                    type: 'sprite'
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

                            let slices = [];
                            for (var y = 0; y < Math.floor(h / ys); y++) {
                                const slice = game.make.sprite(element.position.left, element.position.top + (y * ys), element.id);
                                slice.crop(new Phaser.Rectangle(0, y * ys, w, ys));
                                slice.ox = slice.x;
                                slice.cx = game.math.wrap(y * 2, 0, (waveform.length - 1));
                                sprites.addChild(slice);
                                slices.push(slice);
                                if (layer !== undefined)
                                    gameState.layers.push({
                                        sprite: slice,
                                        layer,
                                        element: {
                                            position: {
                                                top: slice.y,
                                                left: slice.x
                                            }
                                        },
                                        type: 'sin_wobble'
                                    });
                            }
                            gameState.animations.sin_wobbles.push({
                                properties: { ... anim.properties, waveform },
                                sprites: slices
                            });
                        }
                        if (anim.type === 'flash') {
                            const sprite = game.add.sprite(element.position.left, element.position.top, element.id);
                            sprite.scale.set(parseInt(element.dimensions.width) / sprite.width);
                            if (layer !== undefined)
                                gameState.layers.push({
                                    sprite,
                                    layer,
                                    element,
                                    type: 'sprite'
                                });
                            game.add.tween(sprite).to({ alpha: 0 }, anim.properties.duration, "Sine.easeInOut", true, anim.properties.delay, -1, true);
                            
                        }
                    });
                }
            } else {
                const sprite = game.add.sprite(element.position.left, element.position.top, element.id);
                sprite.scale.set(parseInt(element.dimensions.width) / sprite.width);
                if (layer !== undefined)
                    gameState.layers.push({
                        sprite,
                        layer,
                        element,
                        type: 'sprite'
                    });
            }
        } else if (element.type == 'emitter') {
            const emitter = game.add.emitter(
                element.position.left == 'world_center' ? game.world.centerX : element.position.left,
                element.position.top,
                element.emitter.max_particles
            );
            emitter.width = game.world.width;
            emitter.makeParticles(element.id);

            emitter.minParticleScale = element.emitter.min_particle_scale;
            emitter.maxParticleScale = element.emitter.max_particle_scale;

            emitter.setYSpeed(
                element.emitter.min_y_speed,
                element.emitter.max_y_speed
            );
            emitter.setXSpeed(
                element.emitter.min_x_speed,
                element.emitter.max_x_speed
            );

            emitter.minRotation = element.emitter.min_rotation;
            emitter.maxRotation = element.emitter.max_rotation;

            emitter.start(
                element.emitter.explode,
                element.emitter.lifespan,
                element.emitter.frequency,
                element.emitter.quantity
            );
        }
    });

    // cursor input
    if (layout.canvas.input.includes('cursor'))
        gameState.cursors = game.input.keyboard.createCursorKeys();

    if (layout.canvas.input.includes('zoom'))
        game.input.mouse.mouseWheelCallback = (event) => {
            mouseWheelCallback(event, game, layout, gameState);
        };

    if (has(layout.canvas.camera, 'start_x'))
        gameState.parallax.shift_x = layout.canvas.camera.start_x;
    if (has(layout.canvas.camera, 'start_y'))
        gameState.parallax.shift_y = layout.canvas.camera.start_y;
}

export const mouseWheelCallback = (event, game, layout, gameState) => {
    if (event.wheelDeltaY > 0) {
        gameState.camera.zoom += layout.canvas.camera.zoom_speed;
        if (gameState.camera.zoom > layout.canvas.camera.max_zoom)
            gameState.camera.zoom = layout.canvas.camera.max_zoom;
    } else {
        gameState.camera.zoom -= layout.canvas.camera.zoom_speed;
        if (gameState.camera.zoom < layout.canvas.camera.min_zoom)
            gameState.camera.zoom = layout.canvas.camera.min_zoom;
    }
};

export const updateFromLayout = (game, layout, gameState) => {

    // game.debug.pointer(game.input.pointer1);
    // game.debug.pointer(game.input.pointer2);

    if (layout.canvas.input.includes('pinch')) {
        if (game.input.pointer1.isDown && game.input.pointer2.isDown) {
            const deltaY = Math.abs(game.input.pointer1.clientY - game.input.pointer2.clientY);
            const deltaX = Math.abs(game.input.pointer1.clientX - game.input.pointer2.clientX);
            const pinchCoefficient = (deltaY + deltaX) / 2;
            // game.debug.text(pinchCoefficient, 10, 80);
            if (gameState.pointer.last_pinch_coefficient !== undefined) {
                if (pinchCoefficient > gameState.pointer.last_pinch_coefficient) {
                    gameState.camera.zoom += layout.canvas.camera.zoom_speed;
                    if (gameState.camera.zoom > layout.canvas.camera.max_zoom)
                        gameState.camera.zoom = layout.canvas.camera.max_zoom;
                } else if (pinchCoefficient < gameState.pointer.last_pinch_coefficient) {
                    gameState.camera.zoom -= layout.canvas.camera.zoom_speed;
                    if (gameState.camera.zoom < layout.canvas.camera.min_zoom)
                        gameState.camera.zoom = layout.canvas.camera.min_zoom;
                }
            }
            gameState.pointer.last_pinch_coefficient = pinchCoefficient;
        } else {
            gameState.pointer.last_pinch_coefficient = undefined;
        }
    }

    if (layout.canvas.input.includes('pan')) {
        if (game.input.activePointer.isDown) {
            if (gameState.pointer.last_x !== undefined) {
                gameState.parallax.shift_x += gameState.pointer.last_x - game.input.activePointer.clientX;
            }
            if (gameState.pointer.last_y !== undefined) {
                gameState.parallax.shift_y += gameState.pointer.last_y - game.input.activePointer.clientY;
            }
            gameState.pointer.last_x = game.input.activePointer.clientX;
            gameState.pointer.last_y = game.input.activePointer.clientY;
        } else {
            gameState.pointer.last_x = undefined;
            gameState.pointer.last_y = undefined;
        }
    }

    if (layout.canvas.input.includes('cursor')) {
        if (gameState.cursors.left.isDown) {
            gameState.parallax.shift_x -= layout.canvas.camera.speed_x;
        } else if (gameState.cursors.right.isDown) {
            gameState.parallax.shift_x += layout.canvas.camera.speed_x;
        }
        if (gameState.cursors.up.isDown) {
            gameState.parallax.shift_y -= layout.canvas.camera.speed_y;
        } else if (gameState.cursors.down.isDown) {
            gameState.parallax.shift_y += layout.canvas.camera.speed_y;
        }
    }

    if (gameState.parallax.shift_x <= 0) {
        gameState.parallax.shift_x = 0;
    }
    if (gameState.parallax.shift_x > (layout.canvas.dimensions.width - game.width)) {
        gameState.parallax.shift_x = (layout.canvas.dimensions.width - game.width);
    }

    if (gameState.parallax.shift_y <= 0) {
        gameState.parallax.shift_y = 0;
    }
    if (gameState.parallax.shift_y > (layout.canvas.dimensions.height - game.height)) {
        gameState.parallax.shift_y = (layout.canvas.dimensions.height - game.height);
    }

    game.camera.x = gameState.parallax.shift_x;
    game.camera.y = gameState.parallax.shift_y;

    game.camera.scale.x = gameState.camera.zoom;
    game.camera.scale.y = gameState.camera.zoom;

    forEach(gameState.layers, function (layer, i) {
        if (layer.type == 'sprite') {
            layer.sprite.x = layer.element.position.left - (gameState.parallax.shift_x * layer.layer.motion_scale_x) + (layer.sprite.anchor.x * layer.sprite._frame.width * layer.sprite.scale.x);
            layer.sprite.y = layer.element.position.top - (gameState.parallax.shift_y * layer.layer.motion_scale_y) + (layer.sprite.anchor.y * layer.sprite._frame.height * layer.sprite.scale.y);
        }
        if (layer.type == 'sin_wobble') {
            layer.sprite.ox = layer.element.position.left - (gameState.parallax.shift_x * layer.layer.motion_scale_x);
            layer.sprite.y = layer.element.position.top - (gameState.parallax.shift_y * layer.layer.motion_scale_y);
        }
    });

    /** Animations  */
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