define(['game', 'sweetCookie', 'controller'], function (game, SweetCookie, controller) {
    var map,
        levelFourFirstLayerBackground,
        levelFourSecondLayerPlatforms,
        cookiesGroup,
        cookiesCoordinates;

    function Level4State() {
    }

    Level4State.prototype.init = function (player, controller) {
        this.player = player;
        this.controller = controller;
    };

    Level4State.prototype.preload = function () {
        this.load.tilemap('LevelFourMap', 'levels/LevelFourMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('countryside-background', 'L4-BigBirdTown/l4-background-001.jpg');
        this.load.image('wooden-platform', 'L4-BigBirdTown/Platforms.png');
        this.load.image('sweet-cookie', 'L4-BigBirdTown/cookie1.png');
    };

    Level4State.prototype.create = function () {
        // Load level four map
        map = this.add.tilemap('LevelFourMap');
        map.addTilesetImage('background', 'countryside-background');
        map.addTilesetImage('platforms', 'wooden-platform');

        levelFourFirstLayerBackground = map.createLayer('LevelFour - background');
        levelFourFirstLayerBackground.resizeWorld();
        levelFourFirstLayerBackground.wrap = true;

        levelFourSecondLayerPlatforms = map.createLayer('LevelFour - platforms');
        levelFourSecondLayerPlatforms.resizeWorld();
        levelFourSecondLayerPlatforms.wrap = true;

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelFourSecondLayerPlatforms);

        //Create cookies
        cookiesGroup = this.add.group();
        cookiesGroup.enableBody = true;

        this.player.placeAtMap(100, 250);
        this.player.makeBodyArcade();
        this.player.addAnimations();

        // Camera will move with the player
        this.camera.follow(this.player.graphics);

        this.controller.pause();
        this.controller.showScore();

        cookiesCoordinates = [
            {x: 105, y: 115},
            {x: 480, y: 180},
            {x: 620, y: 370},
            {x: 690, y: 370},
            {x: 720, y: 85},
            {x: 975, y: 180},
            {x: 1350, y: 375},
            {x: 1400, y: 375},
            {x: 1450, y: 375},
            {x: 1200, y: 90},
            {x: 1250, y: 90},
            {x: 2100, y: 140},
            {x: 2150, y: 110},
            {x: 2200, y: 80},
            {x: 2250, y: 80},
            {x: 2300, y: 110},
            {x: 2350, y: 140},
            {x: 2350, y: 440},
            {x: 2400, y: 440},
            {x: 2650, y: 60},
            {x: 3900, y: 90},
            {x: 3950, y: 90},
            {x: 4000, y: 90},
            {x: 3900, y: 260},
            {x: 3950, y: 300},
            {x: 4000, y: 340},
            {x: 4250, y: 250},
            {x: 4250, y: 440}
        ];

        for (var i = 0; i < cookiesCoordinates.length; i += 1) {
            var currentCookie = cookiesCoordinates[i];
            var x = currentCookie.x;
            var y = currentCookie.y;

            SweetCookie.init(x, y, cookiesGroup);
        }
    };

    Level4State.prototype.update = function () {
        game.physics.arcade.collide(this.player.graphics, levelFourSecondLayerPlatforms);
        game.physics.arcade.overlap(this.player.graphics, cookiesGroup, this.controller.collectItems, null, this);

        this.controller.update(levelFourSecondLayerPlatforms, cookiesGroup);

        if (this.player.points === 680) {
            // TODO: Load final state - score, statistic
        }
    };

    return Level4State;
});
