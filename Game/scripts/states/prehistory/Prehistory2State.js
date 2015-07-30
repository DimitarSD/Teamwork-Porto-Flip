define(['game'], function (game) {
    var body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');

    function Prehistory2State() {
    };

    Prehistory2State.prototype.create = function () {
        var span,
            spanText,
            divPrehistory,
            divPrehistoryText,
            playGameButton,
            playGameButtonText,
            playButton;

        span = document.createElement('span');
        spanText = document.createTextNode('Prehistory');
        span.textContent = spanText.textContent;

        divPrehistory = document.CreateElement('div');
        divPrehistoryText = document.createTextNode('At long last scientist found out that the cats have an evil plan to enslave all of humanity. The sinister organization Al cat-qaeda have been targeting high profile programmers and taking them down (a.k.a brutally murdering them), because they are the only ones that can ruin their plans.
Your task is ...');
        divPrehistory.textContent = divPrehistoryText.textContent;
        divPrehistory.id = 'divPrehistory';
        divPrehistory.style.backgroundImage = "url('images/Prehistory/paper-roll.png')";     

        playGameButton = document.createElement('button');
        playGameButton.className = 'hvr-border-fade';
        playGameButton.id = 'play-game';

        playGameButtonText = document.createTextNode('Play Now');
        playGameButton.textContent = playGameButtonText.textContent;

        div.appendChild(span);
        div.appendChild(divPrehistory);
        div.appendChild(playGameButton);

        div.style.backgroundImage = "url('images/Game Over - messages background/L2-cat.jpg')";

        body.appendChild(div);

        playButton = document.getElementById('play-game');
        playButton.onclick = function () {
            div.removeChild(span);
            div.removeChild(divPrehistory);
            div.removeChild(playGameButton);
            body.removeChild(div);
            game.state.start('play');
        };
    };

    return Prehistory2State;
});
