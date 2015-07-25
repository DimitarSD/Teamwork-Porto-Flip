(function () {
    var game = new Phaser.Game(1000, 500, Phaser.Canvas),
        map,
        levelOneFirstLayerBackground,
        levelOneSecondLayerPlatforms,
        cursors,
        goldenSnitches,
        player,
        score = 0,
        scoreText,
        pause_label,
        PlayState = function () {},
        BootState = function () {},
        LoadState = function () {},
        MenuState = function () {},
        arrow,
        buttons;

    BootState.prototype.init = function () {
        // Add here the scaling options
    };

    BootState.prototype.preload = function () {
        game.load.image('loading', 'assets/loading.png');
        game.load.image('load_progress_bar', 'assets/progress_bar_bg.png');
        game.load.image('load_progress_bar_dark', 'assets/progress_bar_fg.png');

        game.load.audio('bg-music', 'music/kickstarter.mp3');
    };

    BootState.prototype.create = function () {
        var music = game.add.audio('bg-music', 1, true);
        music.autoplay = true;

        music.play();

        game.state.start('load');
    };

    LoadState.prototype.loadingLabel = function () {
        this.loading = game.add.sprite(game.world.centerX, game.world.centerY - 20, 'loading');
        this.loading.anchor.setTo(0.5, 0.5);

        this.barBg = game.add.sprite(game.world.centerX, game.world.centerY + 40, 'load_progress_bar');
        this.barBg.anchor.setTo(0.5, 0.5);

        this.bar = game.add.sprite(game.world.centerX - 192, game.world.centerY + 40, 'load_progress_bar_dark');
        this.bar.anchor.setTo(0, 0.5);

        game.load.setPreloadSprite(this.bar);
    };

    LoadState.prototype.preload = function () {
        this.loadingLabel();

        game.load.image('menu_title', 'assets/menu_game_title.png');
        game.load.image('menu_arrow', 'assets/menu_arrow.png');
        game.load.image('menu_button1', 'assets/menu_button.png');
        game.load.image('menu_button2', 'assets/menu_button2.png');
        game.load.image('menu_button3', 'assets/menu_button3.png');
    };

    LoadState.prototype.create = function () {
        game.state.start('menu');
    };

    MenuState.prototype.create = function () {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.gameTitle = game.add.image(game.world.centerX, game.world.centerY - 200, 'menu_title');
        this.gameTitle.anchor.setTo(0.5, 0.5);
        buttons.draw();
        arrow.draw(buttons, 1);
    };

    MenuState.prototype.update = function () {
        arrow.move(this.cursors, buttons);
    };

    arrow = {
        draw: function () {
            this.arrow = game.add.image(game.world.centerX - 100, game.world.centerY - 50, 'menu_arrow');
            this.arrow.anchor.setTo(0.5, 0.5);
            this.arrow.moveDelay = 200;
            this.arrow.canMove = true;
            this.arrow.currentButton = 1;
            game.add.tween(this.arrow)
                .to({
                    x: this.arrow.x - 10
                }, 700, Phaser.Easing.Quadratic.Out)
                .to({
                    x: this.arrow.x
                }, 400, Phaser.Easing.Quadratic.In)
                .loop()
                .start();
        },

        move: function (cursors, buttons) {
            if (cursors.down.isDown && this.arrow.canMove) {
                this.arrow.canMove = false;
                this.allowMovement();
                if (this.arrow.currentButton === 1) {
                    this.tween(buttons, 2);
                } else if (this.arrow.currentButton === 2) {
                    this.tween(buttons, 3);
                } else {
                    this.tween(buttons, 1);
                }
            }

            if (cursors.up.isDown && this.arrow.canMove) {
                this.arrow.canMove = false;
                this.allowMovement();
                if (this.arrow.currentButton === 1) {
                    this.tween(buttons, 3);
                } else if (this.arrow.currentButton === 2) {
                    this.tween(buttons, 1);
                } else {
                    this.tween(buttons, 2);
                }
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
                this.activateButton(buttons, this.arrow.currentButton);
            }
        },

        tween: function (buttons, buttonNum) {
            game.add.tween(this.arrow)
                .to({
                    y: game.world.centerY + buttons.pos[buttonNum - 1]
                }, this.arrow.moveDelay, Phaser.Easing.Quadratic.In)
                .start();
            this.arrow.currentButton = buttonNum;
        },

        allowMovement: function () {
            game.time.events.add(255, (function () {
                this.arrow.canMove = true;
            }), this);
        },

        activateButton: function (buttons, currentButton) {
            buttons[buttons.callbacks[currentButton - 1]]();
        }
    };

    buttons = {
        pos: [-50, 50, 150],
        callbacks: ['playState', 'playState', 'playState'],
        draw: function () {
            this.button1 = this.addButton(1, this.playState);
            this.button1.anchor.setTo(0.5, 0.5);

            this.button2 = this.addButton(2, this.playState);
            this.button2.anchor.setTo(0.5, 0.5);

            this.button3 = this.addButton(3, this.playState);
            this.button3.anchor.setTo(0.5, 0.5);
        },

        addButton: function (position, func) {
            return game.add.button(game.world.centerX, game.world.centerY + this.pos[position - 1], 'menu_button' + position, func);
        },

        playState: function () {
            game.state.start('play');
        }
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

        goldenSnitches = this.add.group();
        goldenSnitches.enableBody = true;

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

        var GoldenSnitch = (function (game, group) {
            var snitch = {
                init: function (x, y) {
                    snitch.graphics = group.create(x, y, 'golden-snitch-one');
                }
            };

            return snitch;
        }(this.game, goldenSnitches));

        for (var i = 0; i < goldenSnitchesCoordinates.length; i += 1) {
            var currentSnitch = goldenSnitchesCoordinates[i];
            var x = currentSnitch.x;
            var y = currentSnitch.y;

            GoldenSnitch.init(x, y);
        }

        var Player = (function (game) {
            var player = {
                init: function (name) {
                    this.name = name;
                    this.health = 200;
                    this.points = 0;
                    this.lives = 0;
                    this.graphics = game.add.sprite(100, 250, 'telerik-ninja');

                    return this;
                },
                makeBodyArcade: function () {
                    // We need to enable physics on the player
                    game.physics.arcade.enable(this.graphics);

                    // Player physics properties
                    this.graphics.body.bounce.y = 0.2;
                    this.graphics.body.gravity.y = 300;
                    this.graphics.body.collideWorldBounds = true;
                },
                addAnimations: function () {
                    // The animations of walking left and right
                    this.graphics.animations.add('left', [0, 1, 2, 3], 10, true);
                    this.graphics.animations.add('right', [5, 6, 7, 8], 10, true);
                }
            };

            return player;
        }(this.game));

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
        this.physics.arcade.overlap(player.graphics, goldenSnitches, collectGoldenSnitches, null, this);

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

    function collectGoldenSnitches(player, snitch) {
        snitch.kill();

        score += 10;
        scoreText.text = 'Score: ' + score;
    }

    function unpause(event) {
        if (game.paused) {
            // TODO: Check if the click was on the 'Back to game'
            //if (event.x && event.y) {
            game.paused = false;

            pause_label.x += 80;
            pause_label.text = 'Pause';
            //}
        }
    }

    //game.state.add('ninja-flipper', PlayState, true);

    game.state.add('play', PlayState);
    game.state.add('load', LoadState);
    game.state.add('menu', MenuState);
    game.state.add('boot', BootState);
    game.state.start('boot');
}());