define(['../../game', 'collectableItem', 'controller'], function (game, CollectableItem, controller) {
    var map,
        levelOneFirstLayerBackground,
        levelOneSecondLayerPlatforms,
        snitchesGroup,
        goldenSnitchesCoordinates;

    function Level1State() {
    };

    Level1State.prototype.init = function (player, controller) {
        this.player = player;
        this.controller = controller;
    };

    Level1State.prototype.preload = function () {
        this.load.tilemap('LevelOneMap', 'levels/LevelOneMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('dark-night-background', 'images/L1-Telegwarts/a-dark-bleak-night-301906.jpg');
        this.load.image('rocks-platform', 'images/L1-Telegwarts/Rocks_sprite(32x32).ss.png');
        this.load.image('golden-snitch-one', 'images/L1-Telegwarts/first-snitch.png');
    };

    Level1State.prototype.create = function () {
        // Load level one map
        map = this.add.tilemap('LevelOneMap');
        map.addTilesetImage('background', 'dark-night-background');
        map.addTilesetImage('platforms', 'rocks-platform');

        levelOneFirstLayerBackground = map.createLayer('LevelOne - background');
        levelOneFirstLayerBackground.resizeWorld();
        levelOneFirstLayerBackground.wrap = true;

        levelOneSecondLayerPlatforms = map.createLayer('LevelOne - platforms');
        levelOneSecondLayerPlatforms.resizeWorld();
        levelOneSecondLayerPlatforms.wrap = true;

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelOneSecondLayerPlatforms);

        //Create snitches
        snitchesGroup = this.add.group();
        snitchesGroup.enableBody = true;

        this.player.placeAtMap(100, 250);
        this.player.makeBodyArcade();
        this.player.addAnimations();

        // Camera will move with the player
        this.camera.follow(this.player.graphics);

        this.controller.pause();
        this.controller.showScore();

        goldenSnitchesCoordinates = [
            {x: 95, y: 150},
            {x: 410, y: 150},
            {x: 605, y: 210},
            {x: 725, y: 155},
            {x: 950, y: 100},
            {x: 1132, y: 130},
            {x: 1515, y: 185},
            {x: 1577, y: 385},
            {x: 1883, y: 285},
            {x: 2160, y: 255},
            {x: 2250, y: 255},
            {x: 2183, y: 155},
            {x: 2392, y: 100},
            {x: 2597, y: 140},
            {x: 2697, y: 140},
            {x: 3002, y: 390},
            {x: 3210, y: 290},
            {x: 3420, y: 90},
            {x: 4120, y: 105},
            {x: 4120, y: 145},
            {x: 4120, y: 185}
        ];

        for (var i = 0; i < goldenSnitchesCoordinates.length; i += 1) {
            var currentSnitch = goldenSnitchesCoordinates[i];
            var x = currentSnitch.x;
            var y = currentSnitch.y;

            new CollectableItem(x, y, snitchesGroup, 'golden-snitch-one');
        }
    };

    Level1State.prototype.update = function () {
        game.physics.arcade.collide(this.player.graphics, levelOneSecondLayerPlatforms);
        game.physics.arcade.overlap(this.player.graphics, snitchesGroup, this.controller.collectItems, null, this);

        this.controller.update(levelOneSecondLayerPlatforms, snitchesGroup);

        if (this.player.points === 210) {
            this.player.level = 3;
            game.state.start('level3', true, false, this.player, this.controller);
        }
    };

    return Level1State;
});
