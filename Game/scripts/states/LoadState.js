define(['game'], function (game) {
    function LoadState () {
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

        game.load.image('menu_title', 'images/menu/menu_game_title.png');
        game.load.image('menu_arrow', 'images/menu/menu_arrow.png');
        game.load.image('menu_button1', 'images/menu/menu_button.png');
        game.load.image('menu_button2', 'images/menu/menu_button2.png');
        game.load.image('menu_button3', 'images/menu/menu_button3.png');
    };

    LoadState.prototype.create = function () {
        game.state.start('menu');
    };

    return LoadState;
});
