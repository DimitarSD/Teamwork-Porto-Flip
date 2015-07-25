define(['game'], function (game) {
    function BootState () {
    };

    BootState.prototype.init = function () {
        // Add here the scaling options
    };

    BootState.prototype.preload = function () {
        game.load.image('loading', 'assets/loading.png');
        game.load.image('load_progress_bar', 'assets/progress_bar_bg.png');
        game.load.image('load_progress_bar_dark', 'assets/progress_bar_fg.png');

        game.load.audio('bg-music', 'music/kickstarter.mp3');
    };

    BootState.prototype.create = function () {
        var music = game.add.audio('bg-music', 1, true);
        music.autoplay = true;

        music.play();

        game.state.start('load');
    };

    return BootState;
});
