define(['game'], function (game) {
    var body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');
        
    div.id = 'prehistory-main-background';
        
    function Prehistory2State() {
    };

    Prehistory2State.prototype.create = function () {
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
        spanText = document.createTextNode('Level 2');
        span.textContent = spanText.textContent;

        divPrehistory = document.createElement('div');
        divPrehistory.id = 'divPrehistory';
        divPrehistory.style.backgroundImage = "url('images/Prehistory/paper-roll.png')"; 
        
        spanInDivPrehistory = document.createElement('span');
        spanInDivPrehistory.id = 'prehistory-span-text';
        spanInDivPrehistoryText = document.createTextNode('Congratilations you helped Saddy pass his first exam. But there are more of ' +
            'them... Now Saddy must master the second part of S# language... but there is a problem. To do this, Kopper must ' +
            'collect all ??? in a dimension where cats have an evil plan to enslave all of humanity. The sinister organization ' +
            'Al cat-qaeda have been targeting high profile programmers (like Saddy Kopper) and taking them down ' +
            '(a.k.a brutally murdering them), because they are the only ones that can ruin their plans. Go and help Saddy!!!');
            
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

        div.style.backgroundImage = "url('images/Game Over - messages background/L2-cat.jpg')";

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

    return Prehistory2State;
});
