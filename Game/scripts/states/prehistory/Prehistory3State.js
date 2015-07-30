define(['game'], function (game) {
    var body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');

    function Prehistory3State() {
    };

    Prehistory3State.prototype.create = function () {
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
        divPrehistoryText = document.createTextNode('Enough  with these silly games – StarCraft, MarCraft...! Let’s do something for the girls! We need to create cosmetics shop!
In the shop there are a lot of shampoos, many different types and aroma. 
Your task is to get all the shampoos, you must help your friends to bathe more often!');
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

        div.style.backgroundImage = "url('images/Game Over - messages background/L3-beach.jpg')";

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

    return Prehistory3State;
});
