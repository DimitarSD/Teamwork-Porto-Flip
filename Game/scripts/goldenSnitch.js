define(['game'], function (game) {
    var snitch = {
        init: function (x, y, group) {
            snitch.graphics = group.create(x, y, 'golden-snitch-one');
        }
    };

    return snitch;
});
