define(['game'], function (game) {
    var body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');

    function Prehistory4State() {
    };

    Prehistory4State.prototype.create = function () {
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

        divPrehistory = document.createElement('div');
        divPrehistoryText = document.createTextNode('The  Cookie monster likes cookies, duh…
Yet the Big Bird (the Big B) holds all the cookies. Big B has a task for the Cookie monster (Cookiemon), in order to give him cookies. 
Your task is to collect all the cookies and beware of angry birds!');
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

        div.style.backgroundImage = "url('images/Game Over - messages background/L4-bigBird.jpg')";

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

    return Prehistory4State;
});
