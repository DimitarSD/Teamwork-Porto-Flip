define(['../../game', 'collectableItem', '../../nyanEnemy', '../../nyanFriend', 'states/levels/LevelState'], function (game, CollectableItem, NyanEnemy, NyanFriend, Parent) {
    var map,
        levelTwoFirstLayerBackground,
        levelTwoSecondLayerPlatforms,
        rainbowGroup,
        rainbowsCoordinates,
        nyanEnemies = [],
        nyanEnemiesCoordinates,
        nyanFriends = [],
        nyanFriendsCoordinates;

    function Level2State() {
    };

    Level2State.prototype = new Parent();
    Level2State.prototype.constructor = Level2State;

    Level2State.prototype.preload = function () {
        this.load.tilemap('LevelTwoMap', 'levels/LevelTwoMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'images/L2-EvilCats/antelope-canyon-6.jpg');
        this.load.image('platform', 'images/L2-EvilCats/platforms-stones.png');
        this.load.image('rainbow', 'images/L4-BigBirdTown/rainbow.png');
        this.load.spritesheet('nyan-friend', 'images/L4-BigBirdTown/nyan-friend76x32.png', 76, 32);
        this.load.spritesheet('nyan-enemy', 'images/L4-BigBirdTown/nyan-enemy76x32.png', 76, 32);
    };

    Level2State.prototype.create = function () {
        Parent.prototype.create.call(this);

        initializeEnemies();
        initializeFriends();
    };

    Level2State.prototype.update = function () {
        Parent.prototype.update.call(this, levelTwoSecondLayerPlatforms, rainbowGroup);
        //this.game.physics.arcade.collide(this, enemiesGroup);

        moveEnemies.call(this);
        moveFriends.call(this);

        if (this.player.points > 330) {
            this.player.level = 3;
            game.state.start('level3', true, false, this.player, this.engine);
        }
    };

    Level2State.prototype.createMap = function () {
        // Load level one map
        map = this.add.tilemap('LevelTwoMap');
        map.addTilesetImage('background', 'background');
        map.addTilesetImage('platforms', 'platform');

        levelTwoFirstLayerBackground = map.createLayer('LevelTwo - background');
        levelTwoFirstLayerBackground.resizeWorld();
        levelTwoFirstLayerBackground.wrap = true;

        levelTwoSecondLayerPlatforms = map.createLayer('LevelTwo - platforms');
        levelTwoSecondLayerPlatforms.resizeWorld();
        levelTwoSecondLayerPlatforms.wrap = true;

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelTwoSecondLayerPlatforms);

        //map.setCollisionByExclusion([1], true, enemiesGroup);
        showLevelPrehistory();
    };

    Level2State.prototype.initializePlayer = function () {
        this.player.placeAtMap(5, 320);

        Parent.prototype.initializePlayer.call(this);
    };

    Level2State.prototype.initializeCollectableItems = function () {
        //Create snitches
        rainbowGroup = this.add.group();
        rainbowGroup.enableBody = true;

        rainbowsCoordinates = [
            {x: 50, y: 70},
            {x: 215, y: 150},
            {x: 360, y: 340},
            {x: 610, y: 35},
            {x: 1132, y: 170},
            {x: 1983, y: 400},
            {x: 2350, y: 90},
            {x: 2400, y: 90},
            {x: 2450, y: 90},
            {x: 2500, y: 90},
            {x: 3260, y: 50},
            {x: 4100, y: 30},
            {x: 3900, y: 30},
            {x: 3700, y: 30}
        ];

        for (var i = 0; i < rainbowsCoordinates.length; i += 1) {
            var currentRainbow = rainbowsCoordinates[i];
            var x = currentRainbow.x;
            var y = currentRainbow.y;

            new CollectableItem(x, y, rainbowGroup, 'rainbow');
        }
    };

    function initializeFriends() {
        nyanFriendsCoordinates = [
            {x: 3300, y: 160}
        ];

        for (var i = 0; i < nyanFriendsCoordinates.length; i += 1) {
            var x = nyanFriendsCoordinates[i].x;
            var y = nyanFriendsCoordinates[i].y;

            var currentNyanCat = new NyanFriend('nyan-friend' + i, 'nyan-friend');
            currentNyanCat.placeAtMap(x, y);
            currentNyanCat.makeBodyArcade();
            currentNyanCat.addAnimations();
            nyanFriends.push(currentNyanCat);
        }
    }

    function moveFriends() {
        for(var i = 0, len = nyanFriends.length; i < len; i += 1) {
            var currentNyanCat = nyanFriends[i];
            currentNyanCat.move();

            if (game.physics.arcade.overlap(this.player.graphics, currentNyanCat.graphics, null, null, this.player)) {
                currentNyanCat.graphics.destroy(true);
                this.engine.meetFriend();
            }
        }
    }

    function initializeEnemies() {
        nyanEnemiesCoordinates = [
            {x: 500, y: 350, direction: 'right'},
            {x: 2500, y: 100, direction: 'left'},
            {x: 2500, y: 350, direction: 'left'},
            {x: 3100, y: 160, direction: 'left'},
            {x: 3200, y: 415, direction: 'left'},
            {x: 4200, y: 410, direction: 'left'}
        ];

        for (var i = 0; i < nyanEnemiesCoordinates.length; i += 1) {
            var x = nyanEnemiesCoordinates[i].x;
            var y = nyanEnemiesCoordinates[i].y;
            var direction = nyanEnemiesCoordinates[i].direction;

            var currentNyanCat = new NyanEnemy('nyan-enemy' + i, 'nyan-enemy', direction);
            currentNyanCat.placeAtMap(x, y);
            currentNyanCat.makeBodyArcade();
            currentNyanCat.addAnimations();
            nyanEnemies.push(currentNyanCat);
        }
    }

    function moveEnemies() {
        for(var i = 0, len = nyanEnemies.length; i < len; i += 1) {
            var currentNyanCat = nyanEnemies[i];
            currentNyanCat.move();
            if(game.physics.arcade.collide(currentNyanCat.graphics, levelTwoSecondLayerPlatforms)) {
                currentNyanCat.direction = toggleDirection(currentNyanCat.direction);
                currentNyanCat.move();
            }

            game.physics.arcade.overlap(this.player.graphics, nyanEnemies[i].graphics, this.player.kill, null, this.player);

        }
    }

    function toggleDirection(direction) {
        if (direction == 'left') {
            direction = 'right';
        } else {
            direction = 'left';
        }

        return direction;
    }

    function showLevelPrehistory() {
        var body = document.getElementsByTagName('body')[0],
            div = document.createElement('div'),
            span,
            spanText,
            divPrehistory,
            spanInDivPrehistory,
            spanInDivPrehistoryText,
            continueGameButton,
            continueGameButtonText,
            playButton;

        div.id = 'prehistory-main-background';

        span = document.createElement('span');
        span.id = 'current-level';
        spanText = document.createTextNode('Level 2');
        span.textContent = spanText.textContent;

        divPrehistory = document.createElement('div');
        divPrehistory.id = 'divPrehistory';
        divPrehistory.style.backgroundImage = "url('images/Prehistory/paper-roll.png')";

        spanInDivPrehistory = document.createElement('span');
        spanInDivPrehistory.id = 'prehistory-span-text';
        spanInDivPrehistoryText = document.createTextNode('Congratulations, you helped Saddy pass his first exam. But there are more of ' +
            'them... Now, Saddy must master the second part of S# language... but there is a problem. To do this, Kopper must ' +
            'collect all the pretty-pretty rainbows, which are in reality deadly weapons, and avoid evil nyan cats who plan to exterminate all of humanity. The sinister organization ' +
            'Al Cat-qaeda, based in a sand cave somewhere in the desert, have been targeting high profile programmers (like Saddy Kopper) and taking them down ' +
            '(a.k.a brutally murdering them), because they are the only ones that can ruin their plans! Saddy knows a snitch in the organization, if you need to boost your score, find him. Go and help Saddy!!!');

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
        };
    }

    return Level2State;
});
