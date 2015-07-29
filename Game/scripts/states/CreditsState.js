define(['game'], function (game) {
    var body = document.getElementsByTagName('body')[0],
        ul = document.createElement('ul'),
        escapeKey;

    function CreditsState() {
    };

    CreditsState.prototype.create = function () {
        escapeKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);

        var teamMembers = [
            {
                name: 'Aleksander Angelov',
                githubProfile: 'https://github.com/Obelixx'
            },
            {
                name: 'Biser Sirakov',
                githubProfile: 'https://github.com/BiserSirakov'
            },
            {
                name: 'Gergana Belcheva',
                githubProfile: 'https://github.com/gbelcheva'
            },
            {
                name: 'Dimitar Dzhurenov',
                githubProfile: 'https://github.com/DimitarSD'
            },
            {
                name: 'Ivelina Popova',
                githubProfile: 'https://github.com/iwelina-popova'
            },
            {
                name: 'Iliana Bobeva',
                githubProfile: 'https://github.com/IlianaB'
            },
            {
                name: 'Tatyana Rangelova',
                githubProfile: 'https://github.com/TanyaRan'
            }
        ];

        for (var i = 0; i < teamMembers.length; i += 1) {
            var li = document.createElement('li'),
                a = document.createElement('a');
                
            a.setAttribute('href', teamMembers[i].githubProfile);
            a.textContent = teamMembers[i].name;
            li.textContent = '+ ';
            li.appendChild(a);
            ul.appendChild(li);
        }

        body.appendChild(ul);
    };

    CreditsState.prototype.update = function () {
        if (escapeKey.isDown) {
            var li = ul.getElementsByTagName('li'),
                len = li.length;
                
            for (var i = 0; i < len; i += 1) {
                var a = li[i].getElementsByTagName('a')[0];
                li[i].removeChild(a);
            }    
            
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            
            body.removeChild(ul);

            game.state.start('menu');
        }
    };

    return CreditsState;
});
