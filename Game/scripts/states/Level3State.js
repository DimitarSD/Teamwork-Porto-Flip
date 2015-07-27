define(['game'], function (game) {
    function Level3State() {
    };

    Level3State.prototype.init = function (player) {
        this.player = player;
    }

    Level3State.prototype.create = function () {


        console.log(this.player);
    };

    return Level3State;
});

