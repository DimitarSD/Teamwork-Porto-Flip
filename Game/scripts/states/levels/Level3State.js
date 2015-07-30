define(['../../game', 'collectableItem', 'states/levels/LevelState'], function (game, CollectableItem, Parent) {
    var map,
        levelThreeFirstLayerBackground,
        levelThreeSecondLayerPlatforms,
        shampoosGroup,
        shampoosCoordinates;

    function Level3State() {
    };

    Level3State.prototype = new Parent();
    Level3State.prototype.constructor = Level3State;

    Level3State.prototype.preload = function () {
        this.load.tilemap('LevelThreeMap', 'levels/LevelThreeMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'images/L3-CosmeticShop/wallpapers/golden-sands-beach-13840-1920x1200.jpg');
        this.load.image('platforms', 'images/L3-CosmeticShop/bamboo-platform(32x32).ss.png');
        this.load.image('shampoo', 'images/L3-CosmeticShop/shampoo.png');
    };

    Level3State.prototype.update = function () {
        Parent.prototype.update.call(this, levelThreeSecondLayerPlatforms, shampoosGroup);

        if (this.player.points === 410) {
            this.player.level = 4;
            game.state.start('level4', true, false, this.player, this.engine);
        }
    };

    Level3State.prototype.createMap = function () {
        // Load level one map
        map = game.add.tilemap('LevelThreeMap');
        map.addTilesetImage('background', 'background');
        map.addTilesetImage('platforms', 'platforms');

        levelThreeFirstLayerBackground = map.createLayer('LevelThree - background');
        levelThreeFirstLayerBackground.resizeWorld();
        levelThreeFirstLayerBackground.wrap = true;

        levelThreeSecondLayerPlatforms = map.createLayer('LevelThree - platforms');
        levelThreeSecondLayerPlatforms.resizeWorld();
        levelThreeSecondLayerPlatforms.wrap = true;

        // Set collision between player and platforms
        map.setCollisionByExclusion([0], true, levelThreeSecondLayerPlatforms);

        showLevelPrehistory();
    };

    Level3State.prototype.initializePlayer = function () {
        //Place player graphics at the map
        this.player.placeAtMap(50, 120);

        Parent.prototype.initializePlayer.call(this);
    };

    Level3State.prototype.initializeCollectableItems = function () {
        //Create shampoos
        shampoosGroup = this.add.group();
        shampoosGroup.enableBody = true;

        shampoosCoordinates = [
            {x: 50, y: 420},
            {x: 185, y: 65},
            {x: 215, y: 65},
            {x: 195, y: 350},
            {x: 315, y: 320},
            {x: 350, y: 450},
            {x: 510, y: 160},
            {x: 415, y: 65},
            {x: 595, y: 320},
            {x: 700, y: 64},
            {x: 670, y: 450},
            {x: 990, y: 350},
            {x: 1020, y: 350},
            {x: 900, y: 65},
            {x: 940, y: 65},
            {x: 980, y: 65},
            {x: 1130, y: 255},
            {x: 1275, y: 195},
            {x: 1400, y: 290},
            {x: 1370, y: 290}
        ];

        for (var i = 0; i < shampoosCoordinates.length; i += 1) {
            var currentShampoo = shampoosCoordinates[i];
            var x = currentShampoo.x;
            var y = currentShampoo.y;

            new CollectableItem(x, y, shampoosGroup, 'shampoo');
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
        };
    
    return Level3State;
});

