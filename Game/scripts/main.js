define(['game', 'states/BootState', 'states/LoadState', 'states/MenuState', 'states/PlayState'], function (game, BootState, LoadState, MenuState, PlayState) {
    //game.state.add('ninja-flipper', PlayState, true);

    game.state.add('boot', BootState);
    game.state.add('load', LoadState);
    game.state.add('menu', MenuState);
    game.state.add('play', PlayState);

    game.state.start('boot');
});
