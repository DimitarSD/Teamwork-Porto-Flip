define(['game'], function (game) {
    var body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');
        div.id = 'message-window';

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
            saveButton,
            saveButtonText,
            playButton,
            saveCurrentGame,
            playerCurrentPoints = this.player.points;

        span = document.createElement('span');
        span.id = 'game-over-title';
        spanText = document.createTextNode('Game over');
        span.textContent = spanText.textContent;

        playAgainButton = document.createElement('button');
        playAgainButton.classList.add('hvr-border-fade');
        playAgainButton.classList.add('message-game-over-button');
        playAgainButton.id = 'message-play-again';

        playAgainButtonText = document.createTextNode('Play again');
        playAgainButton.textContent = playAgainButtonText.textContent;

        saveButton = document.createElement('button');
        saveButton.classList.add('hvr-border-fade');
        saveButton.classList.add('message-game-over-button');
        saveButton.id = 'message-save';

        saveButtonText = document.createTextNode('Save');
        saveButton.textContent = saveButtonText.textContent;

        div.appendChild(span);
        div.appendChild(playAgainButton);
        div.appendChild(saveButton);

        if (this.player.level === 1) {
            div.style.backgroundImage = "url('images/Game Over - messages background/L1-hogwarts.jpg')";
        } else if (this.player.level === 2) {
            div.style.backgroundImage = "url('images/Game Over - messages background/L2-cat.jpg')";
        } else if (this.player.level === 3) {
            div.style.backgroundImage = "url('images/Game Over - messages background/L3-beach.jpg')";
        } else if (this.player.level === 4) {
            div.style.backgroundImage = "url('images/Game Over - messages background/L4-bigBird.jpg')";
        }

        body.appendChild(div);

        playButton = document.getElementById('message-play-again');
        playButton.onclick = function () {
            div.removeChild(span);
            div.removeChild(playAgainButton);
            div.removeChild(saveButton);
            body.removeChild(div);
            game.state.start('play');
        };

        saveCurrentGame = document.getElementById('message-save');
        saveCurrentGame.onclick = function () {
            div.removeChild(span);
            div.removeChild(playAgainButton);
            div.removeChild(saveButton);

            saveResult(playerCurrentPoints);
        };
    };

    function saveResult(playerCurrentPoints) {
        createSaveGameWindow();

        var saveButton = document.getElementById('save-game');

        saveButton.onclick = function () {
            var topScores = localStorage,
                inputValue = document.getElementById('enter-name-input').value;

            topScores.setItem(inputValue, playerCurrentPoints);
        };
    }

    function createSaveGameWindow() {
        var span = document.createElement('span'),
            input = document.createElement('input'),
            saveGameButton = document.createElement('button');

        span.setAttribute('id', 'enter-name');
        span.textContent = 'Enter name';

        input.setAttribute('id', 'enter-name-input');

        saveGameButton.setAttribute('id', 'save-game');
        saveGameButton.className = 'hvr-border-fade';
        saveGameButton.textContent = 'Save Game';

        div.appendChild(span);
        div.appendChild(input);
        div.appendChild(saveGameButton);
    }

    return GameOverState;
});
