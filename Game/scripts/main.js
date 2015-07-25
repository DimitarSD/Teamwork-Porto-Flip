define(['game', 'states/BootState', 'states/LoadState', 'states/MenuState', 'states/PlayState', 'states/HowToState'],
    function (game, BootState, LoadState, MenuState, PlayState, HowToState) {
    //game.state.add('ninja-flipper', PlayState, true);

    game.state.add('boot', BootState);
    game.state.add('load', LoadState);
    game.state.add('menu', MenuState);
    game.state.add('play', PlayState);
    game.state.add('howto', HowToState);

    game.state.start('boot');
});
