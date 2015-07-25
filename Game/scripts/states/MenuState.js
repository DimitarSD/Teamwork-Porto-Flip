define(['game', 'menuArrow', 'menuButtons'], function (game, arrow, buttons) {
    function MenuState () {
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

    return MenuState;
});
