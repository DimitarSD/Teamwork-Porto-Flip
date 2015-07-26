define(['game', 'player'], function (game, Player) {

    var map,
        levelHowtoBackground,
        levelHowtoPlatforms,
        levelHowtoPhrases,
        cursors,
        escapeKey,
        player;

    function HowToState() {
    };

    HowToState.prototype.preload = function () {
        this.load.tilemap('howtoMap', 'HowTo/howto.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'HowTo/trainers.jpg');
        this.load.image('phrases', 'HowTo/phrases.ss.png');
        this.load.image('rocks-platform', 'L1-Telegwarts/Rocks_sprite(32x32).ss.png');
        this.load.spritesheet('telerik-ninja', 'L1-Telegwarts/TANinjaSprite_small(32x48).ss.png', 32, 48);
    };

    HowToState.prototype.create = function () {
        /*
        // TODO replace with HowToTitle and description
        this.cursors = game.input.keyboard.createCursorKeys();
        this.gameTitle = game.add.image(game.world.centerX, game.world.centerY - 200, 'menu_title');
        this.gameTitle.anchor.setTo(0.5, 0.5);
        */

        // Set size of world (size of level map)
        this.world.setBounds(0, 0, 896, 512);
        this.physics.startSystem(Phaser.Physics.Arcade);

        // Load level map
        map = this.add.tilemap('howtoMap');
        map.addTilesetImage('background', 'background');
        map.addTilesetImage('phrases', 'phrases');
        map.addTilesetImage('platforms', 'rocks-platform');

        levelHowtoBackground = map.createLayer('HowTo - background');
        levelHowtoBackground.resizeWorld();
        levelHowtoBackground.wrap = true;

        levelHowtoPhrases = map.createLayer('HowTo - phrases');
        levelHowtoPhrases.resizeWorld();
        levelHowtoPhrases.wrap = true;

        levelHowtoPlatforms = map.createLayer('HowTo - platforms');
        levelHowtoPlatforms.resizeWorld();
        levelHowtoPlatforms.wrap = true;

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelHowtoPlatforms);

        cursors = this.input.keyboard.createCursorKeys();
        escapeKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);

        player = Player.init();
        player.makeBodyArcade();
        player.addAnimations();

        // Camera will move with the player
        this.camera.follow(player.graphics);

    };

    HowToState.prototype.update = function () {
        // Update function
        this.physics.arcade.collide(player.graphics, levelHowtoPlatforms);

        player.graphics.body.velocity.x = 0;

        if (cursors.left.isDown) {
            // Move to the left
            player.move('left');
        }
        else if (cursors.right.isDown) {
            // Move to the right
            player.move('right');
        }
        else {
            // Stand still
            player.stayStill();
        }

        // Allow the player to jump if they are touching the ground
        if (cursors.up.isDown && player.graphics.body.onFloor()) {
            player.jump();
        }

        if (player.graphics.y === 464) {
            if (player.lives) {
                player.kill();
            } else {
                game.state.start('menu');
            }
        }

        if (escapeKey.isDown) {
            game.state.start('menu');
        }

    };

    return HowToState;
});
