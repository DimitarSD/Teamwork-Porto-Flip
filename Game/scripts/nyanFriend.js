define(['game'], function (game) {
    function Cat(name, type) {
        this.name = name;
        this.type = type;
    }

    Cat.prototype.placeAtMap = function (x, y) {
        this.graphics = game.add.sprite(x, y, this.type);
    };

    Cat.prototype.makeBodyArcade = function () {
        // We need to enable physics on the enemy
        game.physics.arcade.enable(this.graphics);

        // Enemy physics properties
        this.graphics.body.collideWorldBounds = true;
    };

    Cat.prototype.addAnimations = function () {
        // The animations of flying left and right
        this.graphics.animations.add('right', [0, 1, 2, 3, 4, 5], 6, true);
    };

    Cat.prototype.move = function () {
        //this.graphics.body.velocity.type = dirIndex * 150;
        this.graphics.animations.play('right');
    };

    return Cat;
});
