define(['game', 'states/BootState', 'states/LoadState', 'states/MenuState', 'states/PlayState',
        'states/HowToState', 'states/CreditsState', 'states/GameOverState','states/levels/Level1State', 'states/levels/Level3State', 'states/levels/Level4State',
        'states/prehistory/Prehistory1State', 'states/prehistory/Prehistory2State',
        'states/prehistory/Prehistory3State', 'states/prehistory/Prehistory4State'],
    function (game, BootState, LoadState, MenuState, PlayState, HowToState, CreditsState, GameOverState,
              Level1State, Level3State, Level4State, Prehistory1State, Prehistory2State, Prehistory3State, Prehistory4State) {
        //game.state.add('ninja-flipper', PlayState, true);

        game.state.add('boot', BootState);
        game.state.add('load', LoadState);
        game.state.add('menu', MenuState);
        game.state.add('play', PlayState);
        game.state.add('howto', HowToState);
        game.state.add('credits', CreditsState);
        game.state.add('level1', Level1State);
        game.state.add('level3', Level3State);
        game.state.add('level4', Level4State);
        game.state.add('prehistory1', Prehistory1State);
        game.state.add('prehistory2', Prehistory2State);
        game.state.add('prehistory3', Prehistory3State);
        game.state.add('prehistory4', Prehistory4State);
        game.state.add('game-over', GameOverState);

        game.state.start('boot');
    });
