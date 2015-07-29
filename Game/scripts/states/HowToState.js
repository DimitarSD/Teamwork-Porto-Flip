define(['game', 'player'], function (game, Player) {
    var map,
        levelHowtoBackground,
        levelHowtoPlatforms,
        levelHowtoPhrases,
        cursors,
        escapeKey;

    function HowToState() {
    };

    HowToState.prototype.preload = function () {
        this.load.tilemap('howtoMap', 'levels/howto.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'images/HowTo/trainers.jpg');
        this.load.image('phrases', 'images/HowTo/phrases.ss.png');
        this.load.image('rocks-platform', 'images/L1-Telegwarts/Rocks_sprite(32x32).ss.png');
        this.load.spritesheet('telerik-ninja', 'images/L1-Telegwarts/TANinjaSprite_small(32x48).ss.png', 32, 48);
    };

    HowToState.prototype.create = function () {
        hideSamuraiSword();
        
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

        this.player = new Player('Test Ninja');
        this.player.placeAtMap(100, 250);
        this.player.makeBodyArcade();
        this.player.addAnimations();

        // Camera will move with the this.player
        this.camera.follow(this.player.graphics);

    };

    HowToState.prototype.update = function () {
        // Update function
        this.physics.arcade.collide(this.player.graphics, levelHowtoPlatforms);

        this.player.graphics.body.velocity.x = 0;

        if (cursors.left.isDown) {
            // Move to the left
            this.player.move('left');
        }
        else if (cursors.right.isDown) {
            // Move to the right
            this.player.move('right');
        }
        else {
            // Stand still
            this.player.stayStill();
        }

        // Allow the this.player to jump if they are touching the ground
        if (cursors.up.isDown && this.player.graphics.body.onFloor()) {
            this.player.jump();
        }

        if (this.player.graphics.y === 464) {
            if (this.player.lives) {
                this.player.kill();
            } else {
                game.state.start('menu');
            }
        }

        if (escapeKey.isDown) {
            showSamuraiSword();
            game.state.start('menu');
        }

    };

    function showSamuraiSword() {
        var svg = document.getElementById('samurai-sword');
        svg.style.zIndex = '1';
    }
    
    function hideSamuraiSword() {
        var svg = document.getElementById('samurai-sword');
        svg.style.zIndex = '0';
    }

    return HowToState;
});
