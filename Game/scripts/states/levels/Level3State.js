define(['../../game', 'collectableItem', 'states/levels/LevelState'], function (game, CollectableItem, Parent) {
    var map,
        levelThreeFirstLayerBackground,
        levelThreeSecondLayerPlatforms,
        shampoosGroup,
        shampoosCoordinates;

    function Level3State() {
    };

    Level3State.prototype = new Parent();
    Level3State.prototype.constructor = Level3State;

    Level3State.prototype.preload = function () {
        this.load.tilemap('LevelThreeMap', 'levels/LevelThreeMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'images/L3-CosmeticShop/wallpapers/golden-sands-beach-13840-1920x1200.jpg');
        this.load.image('platforms', 'images/L3-CosmeticShop/bamboo-platform(32x32).ss.png');
        this.load.image('shampoo', 'images/L3-CosmeticShop/shampoo.png');
    };

    Level3State.prototype.update = function () {
        Parent.prototype.update.call(this, levelThreeSecondLayerPlatforms, shampoosGroup);

        if (this.player.points === 410) {
            this.player.level = 4;
            game.state.start('level4', true, false, this.player, this.engine);
        }
    };

    Level3State.prototype.createMap = function () {
        // Load level one map
        map = game.add.tilemap('LevelThreeMap');
        map.addTilesetImage('background', 'background');
        map.addTilesetImage('platforms', 'platforms');

        levelThreeFirstLayerBackground = map.createLayer('LevelThree - background');
        levelThreeFirstLayerBackground.resizeWorld();
        levelThreeFirstLayerBackground.wrap = true;

        levelThreeSecondLayerPlatforms = map.createLayer('LevelThree - platforms');
        levelThreeSecondLayerPlatforms.resizeWorld();
        levelThreeSecondLayerPlatforms.wrap = true;

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelThreeSecondLayerPlatforms);
    };

    Level3State.prototype.initializePlayer = function () {
        //Place player graphics at the map
        this.player.placeAtMap(50, 120);
        this.player.makeBodyArcade();
        this.player.addAnimations();

        // Camera will move with the player
        this.camera.follow(this.player.graphics);
    };

    Level3State.prototype.initializeCollectableItems = function () {
        //Create shampoos
        shampoosGroup = this.add.group();
        shampoosGroup.enableBody = true;

        shampoosCoordinates = [
            {x: 50, y: 420},
            {x: 185, y: 65},
            {x: 215, y: 65},
            {x: 195, y: 350},
            {x: 315, y: 320},
            {x: 350, y: 450},
            {x: 510, y: 160},
            {x: 415, y: 65},
            {x: 595, y: 320},
            {x: 700, y: 64},
            {x: 670, y: 450},
            {x: 990, y: 350},
            {x: 1020, y: 350},
            {x: 900, y: 65},
            {x: 940, y: 65},
            {x: 980, y: 65},
            {x: 1130, y: 255},
            {x: 1275, y: 195},
            {x: 1400, y: 290},
            {x: 1370, y: 290}
        ];

        for (var i = 0; i < shampoosCoordinates.length; i += 1) {
            var currentShampoo = shampoosCoordinates[i];
            var x = currentShampoo.x;
            var y = currentShampoo.y;

            new CollectableItem(x, y, shampoosGroup, 'shampoo');
        }
    };

    return Level3State;
});

