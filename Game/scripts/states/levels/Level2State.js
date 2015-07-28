define(['../../game', 'collectableItem'], function (game, CollectableItem) {
    var map,
        levelTwoFirstLayerBackground,
        levelTwoSecondLayerPlatforms,
        levelTwoThirdLayerCollisions,
        shampoosGroup;

    function Level2State() {
    };

    Level2State.prototype.init = function (player, controller) {
        this.player = player;
        this.controller = controller;
    };

    Level2State.prototype.preload = function () {
        this.load.tilemap('LevelTwoMap', 'levels/LevelTwoMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'images/L2-EvilCats/wallpapers/antelope-canyon-6.jpg');
        this.load.image('platforms', 'images/L2-EvilCats/platforms/platforms-stones.png');
 //       this.load.image('crates', 'images/L2-EvilCats/platforms/crates(32x32).ss.png');
        this.load.image('shampoo', 'images/L3-CosmeticShop/shampoo.png');
    };

    Level2State.prototype.create = function () {
        // Load level one map
        map = game.add.tilemap('LevelTwoMap');
        map.addTilesetImage('background', 'background');
        map.addTilesetImage('platforms', 'platforms');
//        map.addTilesetImage('crates', 'crates');

        levelTwoFirstLayerBackground = map.createLayer('LevelTwo - background');
        levelTwoFirstLayerBackground.resizeWorld();
        levelTwoFirstLayerBackground.wrap = true;

        levelTwoSecondLayerPlatforms = map.createLayer('LevelTwo - platforms');
        levelTwoSecondLayerPlatforms.resizeWorld();
        levelTwoSecondLayerPlatforms.wrap = true;

        //levelTwoThirdLayerCollisions = map.objects['Object Layer 1'][0];
        //levelTwoThirdLayerCollisions = this.game.add.group();
        //this.map.createFromObjects('Object Layer 1', 10, 'sprite', 10, true, false, levelTwoThirdLayerCollisions);


        //game.physics.p2.convertCollisionObjects(map, 'Object Layer 1', true);

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelTwoSecondLayerPlatforms);
        //map.setCollisionByExclusion([0], true, levelTwoThirdLayerCollisions);

        //Place player graphics at the map
        this.player.placeAtMap(50, 120);
        this.player.makeBodyArcade();
        this.player.addAnimations();

        // Camera will move with the player
        this.camera.follow(this.player.graphics);

        this.controller.pause();
        this.controller.showScore();

        //Create shampoos
        shampoosGroup = this.add.group();
        shampoosGroup.enableBody = true;


        var currentShampoo = {x: 150, y: 400};
        var x = currentShampoo.x;
        var y = currentShampoo.y;
        new CollectableItem(x, y, shampoosGroup, 'shampoo');
    };

    Level2State.prototype.update = function () {
        game.physics.arcade.collide(this.player.graphics, levelTwoSecondLayerPlatforms);
        //game.physics.arcade.collide(this.player.graphics, levelTwoThirdLayerCollisions);
        game.physics.arcade.overlap(this.player.graphics, shampoosGroup, this.controller.collectItems, null, this);

        this.controller.update(levelTwoSecondLayerPlatforms, shampoosGroup);

        if (this.player.points === 410) {
            this.player.level = 3;
            game.state.start('level3', true, false, this.player, this.controller);
        }
    };

    return Level2State;
});

