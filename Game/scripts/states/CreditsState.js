define(['game'], function (game) {
    function CreditsState() {
    };

    CreditsState.prototype.create = function () {
        // TODO replace with Credits and description
        this.cursors = game.input.keyboard.createCursorKeys();
        this.gameTitle = game.add.image(game.world.centerX, game.world.centerY - 200, 'menu_title');
        this.gameTitle.anchor.setTo(0.5, 0.5);
    };

    CreditsState.prototype.update = function () {
        // Update function
    };

    return CreditsState;
});
