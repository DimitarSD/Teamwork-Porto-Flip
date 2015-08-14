define(['../game', 'characters/globalCharacter'], function (game, Parent) {
    function Player(name) {
        this.name = name;
        this.health = 200;
        this.points = 0;
        this.lives = 3;
        this.level = 1;
    };

    Player.prototype = new Parent();
    Player.prototype.constructor = Player;

    Player.prototype.placeAtMap = function (x, y) {
        Parent.prototype.placeAtMap.call(this, x, y, 'telerik-ninja');
    };

    Player.prototype.makeBodyArcade = function () {
        // We need to enable physics on the player
        Parent.prototype.makeBodyArcade.call(this);

        // Player physics properties
        this.graphics.body.bounce.y = 0.2;
        this.graphics.body.gravity.y = 300;
    };

    Player.prototype.addAnimations = function () {
        var animationsCollection = [
            {
                direction: 'left',
                frames: [0, 1, 2, 3],
                frameRate: 6,
                loop: true
            }, {
                direction: 'right',
                frames:  [5, 6, 7, 8],
                frameRate: 6,
                loop: true
            }
        ];

        Parent.prototype.addAnimations.call(this, animationsCollection);

    };

    Player.prototype.move = function (direction) {
        var dirIndex = 1;

        if (direction === 'left') {
            dirIndex = -1;
        }

        this.graphics.body.velocity.x = dirIndex * 150;

        Parent.prototype.move.call(this, direction);
    };

    Player.prototype.stayStill = function () {
        this.graphics.animations.stop();
        this.graphics.frame = 4;
    };

    Player.prototype.jump = function () {
        this.graphics.body.velocity.y = -280;
    };

    Player.prototype.kill = function () {
        if (this.lives) {
            this.lives -= 1;
            this.graphics.reset(100, 250);
        } else {
            game.state.start('game-over', true, false, this);
        }
    };

    Player.prototype.increasePoints = function (points) {
        this.points += points;

        return this;
    };

    return Player;
});
