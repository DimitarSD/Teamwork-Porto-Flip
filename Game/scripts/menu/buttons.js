define(['../game'], function (game) {
    function Buttons() {
        this.pos = [-50, 50, 150];
        this.callbacks = ['playState', 'howToState', 'creditsState'];
    };

    Buttons.prototype.draw = function () {
        this.button1 = this.addButton(1);
        this.button1.anchor.setTo(0.5, 0.5);

        this.button2 = this.addButton(2);
        this.button2.anchor.setTo(0.5, 0.5);

        this.button3 = this.addButton(3);
        this.button3.anchor.setTo(0.5, 0.5);
    };

    Buttons.prototype.addButton = function (position) {
        return game.add.button(game.world.centerX, game.world.centerY + this.pos[position - 1], 'menu_button' + position, this[this.callbacks[position - 1]]);
    };

    Buttons.prototype.playState = function () {
        game.state.start('play');
    };

    Buttons.prototype.howToState = function () {
        game.state.start('howto');
    };

    Buttons.prototype.creditsState = function () {
        game.state.start('credits');
    };

    return Buttons;
});
