define(['game', 'player', 'engine'], function (game, Player, Engine) {
    function PlayState () {
    };

    PlayState.prototype.preload = function () {
        hideSamuraiSword();
        this.load.spritesheet('telerik-ninja', 'images/L1-Telegwarts/TANinjaSprite_small(32x48).ss.png', 32, 48);
    };

    PlayState.prototype.create = function () {
        var cursors,
            player,
            engine;

        // Set size of world (size of level map)
        this.world.setBounds(0, 0, 4500, 500);
        this.physics.startSystem(Phaser.Physics.Arcade);

        cursors = this.input.keyboard.createCursorKeys();

        //Create player
        player = new Player("Telerik Ninja");

        //Create engine to control the game
        engine = new Engine(player);

        player.level = 1;
        game.state.start('level1', true, false, player, engine);
    };

    function hideSamuraiSword() {
        var svg = document.getElementById('samurai-sword');
        svg.style.zIndex = '0';
    }

    return PlayState;
});
