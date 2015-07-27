define(['game', 'menuArrow', 'menuButtons'], function (game, Arrow, Buttons) {
    function MenuState () {
        this.buttons = new Buttons();
        this.arrow = new Arrow();
    };

    MenuState.prototype.create = function () {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.gameTitle = game.add.image(game.world.centerX, game.world.centerY - 200, 'menu_title');
        this.gameTitle.anchor.setTo(0.5, 0.5);

        this.buttons.draw();
        this.arrow.draw(this.buttons, 1);
    };

    MenuState.prototype.update = function () {
        this.arrow.move(this.cursors, this.buttons);
    };

    return MenuState;
});
