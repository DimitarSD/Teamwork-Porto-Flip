define(['game'], function (game) {
    function Enemy(name, type, direction) {
        this.name = name;
        this.type = type;
        this.direction = direction;
    }

    Enemy.prototype.placeAtMap = function (x, y) {
        this.graphics = game.add.sprite(x, y, 'big-bird');
    };

    Enemy.prototype.makeBodyArcade = function () {
        // We need to enable physics on the enemy
        game.physics.arcade.enable(this.graphics);

        // Enemy physics properties
        this.graphics.body.collideWorldBounds = true;
    };

    //Enemy.prototype.addAnimations = function () {
    //    // The animations of flying left and right
    //    this.graphics.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 10, true);
    //    this.graphics.animations.add('right', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, true);
    //};

    Enemy.prototype.move = function () {
        var dirIndex = 1;

        if (this.direction == 'left' || this.direction == 'right') {
            if (this.direction == 'left') {
                dirIndex = -1;
            }

            this.graphics.body.velocity.x = dirIndex * 150;
        } else {
            if (this.direction == 'up') {
                dirIndex = -1;
            }

            this.graphics.body.velocity.y = dirIndex * 150;
        }

        //this.graphics.body.velocity.type = dirIndex * 150;
        this.graphics.animations.play(this.direction);
    };

    return Enemy;
});
