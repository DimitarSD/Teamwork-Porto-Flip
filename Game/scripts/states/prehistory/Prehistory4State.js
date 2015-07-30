define(['game'], function (game) {
    var body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');

        div.id = 'prehistory-main-background';

    function Prehistory4State() {
    };

    Prehistory4State.prototype.create = function () {
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
        spanText = document.createTextNode('Level 4');
        span.textContent = spanText.textContent;

        divPrehistory = document.createElement('div');
        divPrehistory.id = 'divPrehistory';
        divPrehistory.style.backgroundImage = "url('images/Prehistory/paper-roll.png')";     
        
        spanInDivPrehistory = document.createElement('span');
        spanInDivPrehistory.id = 'prehistory-span-text';
        spanInDivPrehistoryText = document.createTextNode('Wooohooo!!! Saddy is smarter than ever now and he is just one step away ' +
            'from defeating Ivomort. But there is problem... Ivomort is not alone. His allies Doncho Malfoy, Niki Snape and ' +
            'Evlogi Lestrange have decided to stop Kopper in his final exam. They decided to use the help of Coockie monster... ' +
            'and he likes cookies, duuuhhh… Yet if Saddy wants to success in his final exam he must collect all cockies to ' +
            'bribe the Coockie monster and to master the CoockieScript so he can be able to defeat Ivomort once and for all. ' +
            'But lookout the Coockie monster has slaves - angry birds called "Aidi". They will trying to stop Saddy.');
            
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

        div.style.backgroundImage = "url('images/Game Over - messages background/L4-bigBird.jpg')";

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

    return Prehistory4State;
});
