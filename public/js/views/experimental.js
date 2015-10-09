var game = new Phaser.Game($(window).width(), $(window).height(), Phaser.CANVAS, 'the-experiment', { preload: preload, create: create, update: update, render: render });
var cursors;
// var particleManager; //particle manager
var map;
var mapLayer;
var player; //spaceship
var starBackground;
var starBackground2;
var starBackgroundSpeed = 3;
var starBackgroundSpeed2 = 4;
var thrusters; //emitter
// var thrusters2; //emitter


function preload() {

    game.load.tilemap('map', '../../tilemaps/spaceship.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('starBackground', '../../img/starBackground.png');
    game.load.image('starBackground2', '../../img/starBackground2.png');
    game.load.image('spaceship_thrust', '../../img/spaceship_thrust.png');
    game.load.image('spaceship_thrust2', '../../img/spaceship_thrust2.png');
    game.load.image('player', '../../img/spaceship.png');
    game.load.image('platformer_tiles', '../../img/platformer_tiles.png');
}

function create() {


    // parallax backgrounds
    starBackground = game.add.tileSprite(0, 0, 5000, 5000, 'starBackground');
    starBackground2 = game.add.tileSprite(0, 0, 5000, 5000, 'starBackground2');

    // tilemap
    map = game.add.tilemap('map');
    map.addTilesetImage('platformer_tiles');
    map.setCollisionBetween(1, 80);
    mapLayer = map.createLayer('Tile Layer 1');
    mapLayer.resizeWorld();

    //thrusters
    //

    // particleManager = this.game.plugins.add(Phaser.ParticleStorm);

    // var data = {
    //     lifespan: 4000,
    //     vy: { min: 1, max: 2 },
    //     alpha: { initial: 0, value: 1, control: [ { x: 0, y: 1 }, { x: 1, y: 0 } ] }
    // };

    // particleManager.addData('basic', data);

    // thrusters2 = particleManager.createEmitter(Phaser.ParticleStorm.PIXEL);
    // thrusters2.renderer.pixelSize = 8;
    // thrusters2.addToWorld();

    thrusters = game.add.emitter(0, 0, 2500);
    thrusters.physicsType = Phaser.Physics.ARCADE
    thrusters.makeParticles(['spaceship_thrust', 'spaceship_thrust2'], undefined, undefined, undefined, true, true);
    thrusters.gravity = 0;
    thrusters.bounce = 0.2;
    // thrusters.minParticleScale = 0.5;
    thrusters.minParticleAlpha = 0.5;
    // thrusters.emitY = 32;
    thrusters.minRotation = 0;
    thrusters.maxRotation = 0;




    // ship
    player = game.add.sprite(300, 50, 'player');
    player.anchor.set(0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.set(0.6);
    player.body.drag.set(100);
    player.body.maxVelocity.set(600);
    player.body.collideWorldBounds = true;


    game.world.setBounds(0, 0, 5000, 5000);
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    game.physics.arcade.collide(player, mapLayer);

    // thrusters.rotation = player.rotation;
    thrusters.x = player.x;
    thrusters.y = player.y;


    // thrusters
    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(player.rotation, 200, player.body.acceleration);
        // console.log(thrusters.minParticleScale);
        // console.log(player.body.velocity.x);

        thrusters.flow(2000);
        thrusters.on = true;
        thrusters.maxParticles += 4;

    } else if (cursors.down.isDown)
    {
        game.physics.arcade.accelerationFromRotation(player.rotation, -150, player.body.acceleration);
        thrusters.flow(2000);
        thrusters.on = true;
        thrusters.maxParticles += 4
    }
    else
    {
        player.body.acceleration.set(0);
        thrusters.on = false;
        thrusters.maxParticles = 50;
    }

    // console.log(player.body.acceleration);

    // set the max scale based on x or y having greater magnitude
    var s = Math.abs(player.body.velocity.x)/200 + 0.6;
    if (Math.abs(player.body.velocity.y) > Math.abs(player.body.velocity.x)) {
        s = Math.abs(player.body.velocity.y)/200 + 0.6
    }

    thrusters.setScale(0.5, s, 0.5, s);


    thrusters.setXSpeed(player.body.velocity.x, player.body.velocity.x + 10);
    thrusters.setYSpeed(player.body.velocity.y, player.body.velocity.y + 10);

    // angle
    if (cursors.left.isDown)
    {
        player.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.angularVelocity = 300;
    }
    else
    {
        player.body.angularVelocity = 0;
    }

    // parallax
    if(game.camera.x > 0) {
        starBackground2.tilePosition.x += (starBackgroundSpeed2 * player.body.velocity.x)/-128;
    }
    if(game.camera.y > 0) {
        starBackground2.tilePosition.y += (starBackgroundSpeed2 * player.body.velocity.y)/-128;
    }
}

function render() {
    // game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.spriteInfo(player, 32, 32);
}