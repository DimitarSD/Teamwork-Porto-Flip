define(['../../game', 'collectableItem', 'engine', 'states/levels/LevelState'], function (game, CollectableItem, Engine, Parent) {
    var map,
        levelTwoFirstLayerBackground,
        levelTwoSecondLayerPlatforms,
        levelThreeSecondLayerEnemies,
        snitchesGroup,
        enemiesGroup,
        goldenSnitchesCoordinates;

    function Level2State() {
    };

    Level2State.prototype = new Parent();
    Level2State.prototype.constructor = Level2State;

    Level2State.prototype.preload = function () {
        this.load.tilemap('LevelTwoMap', 'levels/LevelTwoMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'images/L2-EvilCats/antelope-canyon-6.jpg');
        this.load.image('platform', 'images/L2-EvilCats/platforms-stones.png');
        this.load.image('golden-snitch-one', 'images/L1-Telegwarts/first-snitch.png');
    };

    Level2State.prototype.update = function () {
        Parent.prototype.update.call(this, levelTwoSecondLayerPlatforms, snitchesGroup);
        this.game.physics.arcade.collide(this, enemiesGroup);

        if (this.player.points === 210) {
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

        enemiesGroup = this.add.group();
        enemiesGroup.enableBody = true;
        var result = game.findObjectsByType('enemy', map, 'LevelTwo - enemies');

        result.forEach(function(element){
            game.createFromTiledObject(element, enemiesGroup);
        }, game);

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelTwoSecondLayerPlatforms);
        //map.setCollisionByExclusion([1], true, enemiesGroup);
        showLevelPrehistory();
    };

    Level2State.prototype.initializePlayer = function () {
        this.player.placeAtMap(100, 250);

        Parent.prototype.initializePlayer.call(this);
    };

    Level2State.prototype.initializeCollectableItems = function () {
        //Create snitches
        snitchesGroup = this.add.group();
        snitchesGroup.enableBody = true;

        goldenSnitchesCoordinates = [
            {x: 95, y: 150},
            {x: 410, y: 150},
            {x: 605, y: 210},
            {x: 725, y: 155},
            {x: 950, y: 100},
            {x: 1132, y: 130},
            {x: 1515, y: 185},
            {x: 1577, y: 385},
            {x: 1883, y: 285},
            {x: 2160, y: 255},
            {x: 2250, y: 255},
            {x: 2183, y: 155},
            {x: 2392, y: 100},
            {x: 2597, y: 140},
            {x: 2697, y: 140},
            {x: 3002, y: 390},
            {x: 3210, y: 290},
            {x: 3420, y: 90},
            {x: 4120, y: 105},
            {x: 4120, y: 145},
            {x: 4120, y: 185}
        ];

        for (var i = 0; i < goldenSnitchesCoordinates.length; i += 1) {
            var currentSnitch = goldenSnitchesCoordinates[i];
            var x = currentSnitch.x;
            var y = currentSnitch.y;

            new CollectableItem(x, y, snitchesGroup, 'golden-snitch-one');
        }
    };

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
        };
    }

    return Level2State;
});
