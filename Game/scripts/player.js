define(['game'], function (game) {
    var player = {
        init: function (name) {
            this.name = name;
            this.health = 200;
            this.points = 0;
            this.lives = 0;
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
        }
    };

    return player;
});
