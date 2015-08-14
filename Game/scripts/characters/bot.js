define(['../game', 'characters/globalCharacter'], function (game, Parent) {
    Enemy.prototype = new Parent();
    Enemy.prototype.constructor = Enemy;

    function Enemy(name, type, direction) {
        this.name = name;
        this.type = type;
        this.direction = direction;
    }

    Enemy.prototype.placeAtMap = function (x, y) {
        Parent.prototype.placeAtMap.call(this, x, y, this.type);
    };

    Enemy.prototype.makeBodyArcade = function () {
        Parent.prototype.makeBodyArcade.call(this);
    };

    Enemy.prototype.addAnimations = function (animationsCollection) {
        Parent.prototype.addAnimations.call(this, animationsCollection);
    };

    Enemy.prototype.move = function () {
        var dirIndex = 1;

        if (this.direction == 'left' || this.direction == 'up') {
                dirIndex = -1;
        }

        this.graphics.body.velocity.x = dirIndex * 150;

        //this.graphics.body.velocity.type = dirIndex * 150;
        Parent.prototype.move.call(this, this.direction);
    };

    return Enemy;
});
