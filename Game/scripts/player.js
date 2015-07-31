define(['game'], function (game) {
    function Player(name) {
        this.name = name;
        this.health = 200;
        this.points = 0;
        this.lives = 3;
        this.level = 1;
    };

    Player.prototype.placeAtMap = function (x, y) {
        this.graphics = game.add.sprite(x, y, 'telerik-ninja');
    };

    Player.prototype.makeBodyArcade = function () {
        // We need to enable physics on the player
        game.physics.arcade.enable(this.graphics);

        // Player physics properties
        this.graphics.body.bounce.y = 0.2;
        this.graphics.body.gravity.y = 300;
        this.graphics.body.collideWorldBounds = true;
    };

    Player.prototype.addAnimations = function () {
        // The animations of walking left and right
        this.graphics.animations.add('left', [0, 1, 2, 3], 6, true);
        this.graphics.animations.add('right', [5, 6, 7, 8], 6, true);
    };

    Player.prototype.move = function (direction) {
        var dirIndex = 1;

        if (direction === 'left') {
            dirIndex = -1;
        }

        this.graphics.body.velocity.x = dirIndex * 150;
        this.graphics.animations.play(direction);
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

    Player.prototype.increasePoints = function () {
        this.points += 10;

        return this;
    };

    return Player;
});
