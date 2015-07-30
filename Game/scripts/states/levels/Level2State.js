define(['../../game', 'collectableItem', 'engine', 'states/levels/LevelState'], function (game, CollectableItem, Engine, Parent) {
    var map,
        levelTwoFirstLayerBackground,
        levelTwoSecondLayerPlatforms,
        snitchesGroup,
        goldenSnitchesCoordinates;

    function Level2State() {
    };

    Level2State.prototype = new Parent();
    Level2State.prototype.constructor = Level2State;

    Level2State.prototype.preload = function () {
        this.load.tilemap('LevelTwoMap', 'levels/LevelTwoMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'images/L2-EvilCats/antelope-canyon-6.jpg');
        this.load.image('platform', 'images/L2-EvilCats/platforms-stones.png');
        this.load.image('golden-snitch-one', 'images/L1-Telegwarts/first-snitch.png');
    };

    Level2State.prototype.update = function () {
        Parent.prototype.update.call(this, levelTwoSecondLayerPlatforms, snitchesGroup);

        if (this.player.points === 210) {
            this.player.level = 3;
            game.state.start('level3', true, false, this.player, this.engine);
        }
    };

    Level2State.prototype.createMap = function () {
        // Load level one map
        map = this.add.tilemap('LevelTwoMap');
        map.addTilesetImage('background', 'background');
        map.addTilesetImage('platforms', 'platform');

        levelTwoFirstLayerBackground = map.createLayer('LevelTwo - background');
        levelTwoFirstLayerBackground.resizeWorld();
        levelTwoFirstLayerBackground.wrap = true;

        levelTwoSecondLayerPlatforms = map.createLayer('LevelTwo - platforms');
        levelTwoSecondLayerPlatforms.resizeWorld();
        levelTwoSecondLayerPlatforms.wrap = true;

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelTwoSecondLayerPlatforms);
    };

    Level2State.prototype.initializePlayer = function () {
        this.player.placeAtMap(100, 250);

        Parent.prototype.initializePlayer.call(this);
    };

    Level2State.prototype.initializeCollectableItems = function () {
        //Create snitches
        snitchesGroup = this.add.group();
        snitchesGroup.enableBody = true;

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

    return Level2State;
});
