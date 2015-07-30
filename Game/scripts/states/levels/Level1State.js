define(['../../game', 'collectableItem', 'engine', 'states/levels/LevelState', 'states/prehistory/Prehistory1State'], function (game, CollectableItem, Engine, Parent) {
    var map,
        levelOneFirstLayerBackground,
        levelOneSecondLayerPlatforms,
        snitchesGroup,
        goldenSnitchesCoordinates;

    function Level1State() {
    };

    Level1State.prototype = new Parent();
    Level1State.prototype.constructor = Level1State;

    Level1State.prototype.preload = function () {
        this.load.tilemap('LevelOneMap', 'levels/LevelOneMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('dark-night-background', 'images/L1-Telegwarts/a-dark-bleak-night-301906.jpg');
        this.load.image('rocks-platform', 'images/L1-Telegwarts/Rocks_sprite(32x32).ss.png');
        this.load.image('golden-snitch-one', 'images/L1-Telegwarts/first-snitch.png');
    };

    Level1State.prototype.update = function () {
        Parent.prototype.update.call(this, levelOneSecondLayerPlatforms, snitchesGroup);

        if (this.player.points === 10) {
            this.player.level = 2;
            game.state.start('level2', true, false, this.player, this.engine);
        }
    };

    Level1State.prototype.createMap = function () {
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
        
        game.state.start('prehistory1');
    };

    Level1State.prototype.initializePlayer = function () {
        this.player.placeAtMap(100, 250);

        Parent.prototype.initializePlayer.call(this);
    };

    Level1State.prototype.initializeCollectableItems = function () {
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

    return Level1State;
});
