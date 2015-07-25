define(['game', 'player', 'goldenSnitch'], function (game, Player, GoldenSnitch) {
    var map,
        levelOneFirstLayerBackground,
        levelOneSecondLayerPlatforms,
        cursors,
        snitchesGroup,
        player,
        score = 0,
        scoreText,
        pause_label;

    function PlayState () {
    };

    PlayState.prototype.preload = function () {
        this.load.tilemap('LevelOneMap', 'levels/LevelOneMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('dark-night-background', 'L1-Telegwarts/a-dark-bleak-night-301906.jpg');
        this.load.image('rocks-platform', 'L1-Telegwarts/Rocks_sprite(32x32).ss.png');
        this.load.image('golden-snitch-one', 'L1-Telegwarts/first-snitch.png');
        this.load.spritesheet('telerik-ninja', 'L1-Telegwarts/TANinjaSprite_small(32x48).ss.png', 32, 48);
    };

    PlayState.prototype.create = function () {
        // Set size of world (size of level map)
        this.world.setBounds(0, 0, 4500, 500);
        this.physics.startSystem(Phaser.Physics.Arcade);

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

        cursors = this.input.keyboard.createCursorKeys();

        snitchesGroup = this.add.group();
        snitchesGroup.enableBody = true;

        var goldenSnitchesCoordinates = [
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

            GoldenSnitch.init(x, y, snitchesGroup);
        }

        player = Player.init();
        player.makeBodyArcade();
        player.addAnimations();

        // Camera will move with the player
        this.camera.follow(player.graphics);

        scoreText = this.add.text(16, 30, 'Score: 0', {font: '32px Arial', fill: 'white'});
        scoreText.fixedToCamera = true;

        pause_label = this.add.text(900, 30, 'Pause', {font: '24px Arial', fill: 'white'});
        pause_label.fixedToCamera = true;
        pause_label.inputEnabled = true;

        pause_label.events.onInputUp.add(function () {
            game.paused = true;

            pause_label.x -= 80;
            pause_label.text = 'Back to game';
        });

        game.input.onDown.add(unpause, self);
    };

    PlayState.prototype.update = function () {
        this.physics.arcade.collide(player.graphics, levelOneSecondLayerPlatforms);
        this.physics.arcade.overlap(player.graphics, snitchesGroup, collectGoldenSnitches, null, this);

        player.graphics.body.velocity.x = 0;

        if (cursors.left.isDown) {
            // Move to the left
            player.graphics.body.velocity.x = -150;
            player.graphics.animations.play('left');
        }
        else if (cursors.right.isDown) {
            // Move to the right
            player.graphics.body.velocity.x = 150;
            player.graphics.animations.play('right');
        }
        else {
            // Stand still
            player.graphics.animations.stop();
            player.graphics.frame = 4;
        }

        // Allow the player to jump if they are touching the ground
        if (cursors.up.isDown && player.graphics.body.onFloor()) {
            player.graphics.body.velocity.y = -280;
        }
    };

    function collectGoldenSnitches (player, snitch) {
        snitch.kill();

        score += 10;
        scoreText.text = 'Score: ' + score;
    }

    function unpause (event) {
        if (game.paused) {
            // TODO: Check if the click was on the 'Back to game'
            //if (event.x && event.y) {
            game.paused = false;

            pause_label.x += 80;
            pause_label.text = 'Pause';
            //}
        }
    }

    return PlayState;
});
