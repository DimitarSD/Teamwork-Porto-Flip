define(['../../game', 'collectableItem', 'enemy', 'states/levels/LevelState'], function (game, CollectableItem, BigBird, Parent) {
    var map,
        levelFourFirstLayerBackground,
        levelFourSecondLayerPlatforms,
        cookiesGroup,
        cookiesCoordinates,
        bigBirds = [],
        bigBirdsCoordinates;

    function Level4State() {
    }

    Level4State.prototype = new Parent();
    Level4State.prototype.constructor = Level4State;

    Level4State.prototype.preload = function () {
        this.load.tilemap('LevelFourMap', 'levels/LevelFourMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('countryside-background', 'images/L4-BigBirdTown/l4-background-001.jpg');
        this.load.image('wooden-platform', 'images/L4-BigBirdTown/Platforms.png');
        this.load.image('sweet-cookie', 'images/L4-BigBirdTown/cookie1.png');
        this.load.spritesheet('big-bird', 'images/L4-BigBirdTown/bird.ss.png', 100, 100);
    };

    Level4State.prototype.create = function () {
        Parent.prototype.create.call(this);

        initializeEnemies();
    };

    Level4State.prototype.update = function () {
        Parent.prototype.update.call(this, levelFourSecondLayerPlatforms, cookiesGroup);

        moveEnemies.call(this);

        if (this.player.points === 680) {
            // TODO: Load final state - score, statistic
        }
    };

    Level4State.prototype.createMap = function () {
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
    };

    Level4State.prototype.initializePlayer = function () {
        this.player.placeAtMap(100, 250);

        Parent.prototype.initializePlayer.call(this);
    };

    Level4State.prototype.initializeCollectableItems = function () {
        //Create cookies
        cookiesGroup = this.add.group();
        cookiesGroup.enableBody = true;

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

        for (var i = 0, len = cookiesCoordinates.length; i < len; i += 1) {
            var currentCookie = cookiesCoordinates[i];
            var x = currentCookie.x;
            var y = currentCookie.y;

            new CollectableItem(x, y, cookiesGroup, 'sweet-cookie');
        }
    };

    function initializeEnemies() {
        bigBirdsCoordinates = [
            {x: 1300, y: 350, direction: 'left'},
            {x: 2200, y: 400, direction: 'up'},
            {x: 3025, y: 100, direction: 'down'},
            {x: 2900, y: 350, direction: 'left'}
        ];

        for (var i = 0; i < bigBirdsCoordinates.length; i += 1) {
            var x = bigBirdsCoordinates[i].x;
            var y = bigBirdsCoordinates[i].y;
            var direction = bigBirdsCoordinates[i].direction;

            var currentBigBird = new BigBird('big-bird' + i, 'big-bird', direction);
            currentBigBird.placeAtMap(x, y);
            currentBigBird.makeBodyArcade();
            //currentBigBird.addAnimations();
            bigBirds.push(currentBigBird);
        }
    }

    function moveEnemies() {
        for(var i = 0, len = bigBirds.length; i < len; i += 1) {
            var currentBird = bigBirds[i];
            currentBird.move();
            if(game.physics.arcade.collide(currentBird.graphics, levelFourSecondLayerPlatforms)) {
                currentBird.direction = toggleDirection(currentBird.direction);
                currentBird.move();
            }

            game.physics.arcade.overlap(this.player.graphics, bigBirds[i].graphics, this.player.kill, null, this.player);
        }
    }

    function toggleDirection(direction) {
        if(direction == 'left') {
            direction = 'right';
        } else if(direction == 'right') {
            direction = 'left';
        } else if(direction == 'up') {
            direction = 'down';
        } else {
            direction = 'up';
        }

        return direction;
    }

    return Level4State;
});
