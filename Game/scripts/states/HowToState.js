define(['game'], function (game) {
    function HowToState() {
    };

    HowToState.prototype.create = function () {
        // TODO replace with HowToTitle and description
        this.cursors = game.input.keyboard.createCursorKeys();
        this.gameTitle = game.add.image(game.world.centerX, game.world.centerY - 200, 'menu_title');
        this.gameTitle.anchor.setTo(0.5, 0.5);
    };

    HowToState.prototype.update = function () {
        // Update function
    };

    return HowToState;
});
