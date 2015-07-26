define(['game'], function (game) {
    var player = {
        init: function (name) {
            this.name = name;
            this.health = 200;
            this.points = 0;
            this.lives = 3;
            this.level = 1;
            this.graphics = game.add.sprite(100, 250, 'telerik-ninja');

            return this;
        },
        makeBodyArcade: function () {
            // We need to enable physics on the player
            game.physics.arcade.enable(this.graphics);

            // Player physics properties
            this.graphics.body.bounce.y = 0.2;
            this.graphics.body.gravity.y = 300;
            this.graphics.body.collideWorldBounds = true;
        },
        addAnimations: function () {
            // The animations of walking left and right
            this.graphics.animations.add('left', [0, 1, 2, 3], 10, true);
            this.graphics.animations.add('right', [5, 6, 7, 8], 10, true);
        },
        move: function (direction) {
            var dirIndex = 1;

            if (direction === 'left') {
                dirIndex = -1;
            }

            this.graphics.body.velocity.x = dirIndex * 150;
            this.graphics.animations.play(direction);
        },
        stayStill: function () {
            this.graphics.animations.stop();
            this.graphics.frame = 4;
        },
        jump: function () {
            this.graphics.body.velocity.y = -280;
        },
        kill: function () {
            this.lives -= 1;
            this.graphics.reset(100, 250);
        },
        increasePoints: function () {
            this.points += 10;
        }
    };

    return player;
});
