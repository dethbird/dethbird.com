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

    forEach(layout.elements, function (element, i) {

        let layer;
        if (has(element, 'layer'))
            layer = find(layout.layers, { id: element.layer.layer_id });

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
                            if (layer !== undefined)
                                gameState.layers.push({
                                    sprite,
                                    layer,
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
                                        type: 'sin_wobble'
                                    });
                            }
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
                if (layer !== undefined)
                    gameState.layers.push({
                        sprite,
                        layer,
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
            if (game.camera.x > 0) {
                game.camera.x -= layout.canvas.camera.speed_x;
                forEach(gameState.layers, function (layer, i) {
                    if (layer.type == 'sprite')
                        layer.sprite.x += layout.canvas.camera.speed_x * layer.layer.motion_scale;
                    if (layer.type == 'sin_wobble')
                        layer.sprite.ox += layout.canvas.camera.speed_x * layer.layer.motion_scale;
                });
            }
        } else if (gameState.cursors.right.isDown) {
            if (game.camera.x < game.world.width) {
                game.camera.x += layout.canvas.camera.speed_x;
                forEach(gameState.layers, function (layer, i) {
                    if (layer.type == 'sprite')
                        layer.sprite.x -= layout.canvas.camera.speed_x * layer.layer.motion_scale;
                    if (layer.type == 'sin_wobble')
                        layer.sprite.ox -= layout.canvas.camera.speed_x * layer.layer.motion_scale;
                });
            }
        }
        if (gameState.cursors.up.isDown) {
            if (game.camera.y > layout.canvas.camera.lower_bound_y) {
                game.camera.y -= layout.canvas.camera.speed_y;
                forEach(gameState.layers, function (layer, i) {
                    layer.sprite.y += layout.canvas.camera.speed_y * layer.layer.motion_scale;
                });
            }
        } else if (gameState.cursors.down.isDown) {
            if (game.camera.y < layout.canvas.camera.upper_bound_y) {
                game.camera.y += layout.canvas.camera.speed_y;
                forEach(gameState.layers, function (layer, i) {
                    layer.sprite.y -= layout.canvas.camera.speed_y * layer.layer.motion_scale;
                });
            }
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