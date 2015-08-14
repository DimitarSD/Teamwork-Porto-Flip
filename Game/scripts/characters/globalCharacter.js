define(['../game'], function (game) {
    function globalCharacter() {
    };

    globalCharacter.prototype.placeAtMap = function (x, y, name) {
        this.graphics = game.add.sprite(x, y, name);
    };

    globalCharacter.prototype.makeBodyArcade = function () {
        // We need to enable physics on the player
        game.physics.arcade.enable(this.graphics);

        // Player physics properties
        this.graphics.body.collideWorldBounds = true;
    };

    globalCharacter.prototype.addAnimations = function (animationsCollection) {
        // The animations of walking left and right
        for (var i = 0; i < animationsCollection.length; i++) {
            var currentAnimation = animationsCollection[i],
                direction = currentAnimation['direction'],
                frames = currentAnimation['frames'],
                frameRate = currentAnimation['frameRate'],
                loop = currentAnimation['loop'];

            this.graphics.animations.add(direction, frames, frameRate, loop);
        }
    };

    globalCharacter.prototype.move = function (direction) {
        this.graphics.animations.play(direction);
    };



    return globalCharacter;
});
