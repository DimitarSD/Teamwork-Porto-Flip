define(['../game', 'characters/globalCharacter'], function (game, Parent) {
    Bot.prototype = new Parent();
    Bot.prototype.constructor = Bot;

    function Bot(name, type, direction) {
        this.name = name;
        this.type = type;
        this.direction = direction;
    }

    Bot.prototype.placeAtMap = function (x, y) {
        Parent.prototype.placeAtMap.call(this, x, y, this.type);
    };

    Bot.prototype.makeBodyArcade = function () {
        Parent.prototype.makeBodyArcade.call(this);
    };

    Bot.prototype.addAnimations = function (animationsCollection) {
        Parent.prototype.addAnimations.call(this, animationsCollection);
    };

    Bot.prototype.move = function () {
        var dirIndex = 1;

        if (this.direction == 'left' || this.direction == 'up') {
                dirIndex = -1;
        }

        this.graphics.body.velocity.x = dirIndex * 150;

        //this.graphics.body.velocity.type = dirIndex * 150;
        Parent.prototype.move.call(this, this.direction);
    };

    return Bot;
});
