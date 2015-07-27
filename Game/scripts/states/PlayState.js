define(['game', 'player', 'controller'], function (game, Player, Controller) {
    var cursors,
        player,
        controller;

    function PlayState () {
    };

    PlayState.prototype.preload = function () {
        this.load.spritesheet('telerik-ninja', 'L1-Telegwarts/TANinjaSprite_small(32x48).ss.png', 32, 48);
    };

    PlayState.prototype.create = function () {
        // Set size of world (size of level map)
        this.world.setBounds(0, 0, 4500, 500);
        this.physics.startSystem(Phaser.Physics.Arcade);

        cursors = this.input.keyboard.createCursorKeys();

        //Create player
        player = Player.init();

        //Create controller to control the game
        controller = new Controller(player);

        game.state.start('level3', true, false, player, controller);
    };

    return PlayState;
});
