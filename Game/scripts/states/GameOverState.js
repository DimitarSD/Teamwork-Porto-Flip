define(['game', 'player'], function (game, player) {
    var body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');

    function GameOverState() {
    };

    GameOverState.prototype.init = function (player) {
        this.player = player;
    };

    GameOverState.prototype.create = function () {
        var span,
            spanText,
            playAgainButton,
            playAgainButtonText,
            exitButton,
            exitButtonText,
            playButton,
            returnToMenu;

        span = document.createElement('span');
        spanText = document.createTextNode('Game over');
        span.textContent = spanText.textContent;

        playAgainButton = document.createElement('button');
        playAgainButton.className = 'hvr-border-fade';
        playAgainButton.id = 'play-again';

        playAgainButtonText = document.createTextNode('Play again');
        playAgainButton.textContent = playAgainButtonText.textContent;

        exitButton = document.createElement('button');
        exitButton.className = 'hvr-border-fade';
        exitButton.id = 'exit';

        exitButtonText = document.createTextNode('Exit');
        exitButton.textContent = exitButtonText.textContent;

        div.appendChild(span);
        div.appendChild(playAgainButton);
        div.appendChild(exitButton);

        if (player.level === 1) {
            div.style.backgroundImage = "url('images/Game Over - messages background/L1-hogwarts.jpg')";
        } else if (player.level === 2) {
            div.style.backgroundImage = "url('images/Game Over - messages background/L2-cat.jpg')";
        } else if (player.level === 3) {
            div.style.backgroundImage = "url('images/Game Over - messages background/L3-beach.jpg')";
        } else if (player.level === 4) {
            div.style.backgroundImage = "url('images/Game Over - messages background/L4-bigBird.jpg')";
        }

        body.appendChild(div);

        playButton = document.getElementById('play-again');
        playButton.onclick = function () {
            div.removeChild(span);
            div.removeChild(playAgainButton);
            div.removeChild(exitButton);
            body.removeChild(div);
            game.state.start('play');
        };

        returnToMenu = document.getElementById('exit');
        returnToMenu.onclick = function () {
            div.removeChild(span);
            div.removeChild(playAgainButton);
            div.removeChild(exitButton);
            body.removeChild(div);
            game.state.start('menu');
        };

        player.level = 1;
        player.lives = 3;
    };

    return GameOverState;
});
