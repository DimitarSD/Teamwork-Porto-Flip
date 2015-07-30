define(['game'], function (game) {
    var body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');

    div.id = 'prehistory-main-background';

    function Prehistory3State() {
    };

    Prehistory3State.prototype.create = function () {
        var span,
            spanText,
            divPrehistory,
            spanInDivPrehistory,
            spanInDivPrehistoryText,
            continueGameButton,
            continueGameButtonText,
            playButton;

        span = document.createElement('span');
        span.id = 'current-level';
        spanText = document.createTextNode('Level 3');
        span.textContent = spanText.textContent;

        divPrehistory = document.createElement('div');
        divPrehistory.id = 'divPrehistory';
        divPrehistory.style.backgroundImage = "url('images/Prehistory/paper-roll.png')";
        
        spanInDivPrehistory = document.createElement('span');
        spanInDivPrehistory.id = 'prehistory-span-text';
        spanInDivPrehistoryText = document.createTextNode('Enough  with these silly games – StarCraft, MarCraft...! Let’s do ' +
            'something for the girls! We need to create a cosmetics shop! Wait a minute! A cosmetics shop! ' +
            'What the hell!?!?!Yeah, that right! Everyone can learn S# only a few are those who can master the OOP that goes with it. ' +
            'Saddy Kopper is one of them. But in that crazy girl dimension (somewhere in Waka waka eh eh) the young Kopper must ' +
            'create a cosmestics shop. In order to complete this task, he needs to collect all shampoos. If the Amazons are merciful ' +
            '(they will be - Saddy is very charming), they will reveal the secret of mastering OOP.');

        spanInDivPrehistory.textContent = spanInDivPrehistoryText.textContent;

        divPrehistory.appendChild(spanInDivPrehistory);

        continueGameButton = document.createElement('button');
        continueGameButton.className = 'hvr-border-fade';
        continueGameButton.id = 'continue';

        continueGameButtonText = document.createTextNode('Continue');
        continueGameButton.textContent = continueGameButtonText.textContent;

        div.appendChild(span);
        div.appendChild(divPrehistory);
        div.appendChild(continueGameButton);

        div.style.backgroundImage = "url('images/Game Over - messages background/L3-beach.jpg')";

        body.appendChild(div);

        playButton = document.getElementById('continue');
        playButton.onclick = function () {
            div.removeChild(span);
            div.removeChild(divPrehistory);
            div.removeChild(continueGameButton);
            body.removeChild(div);
            game.state.start('play');
        };
    };

    return Prehistory3State;
});
