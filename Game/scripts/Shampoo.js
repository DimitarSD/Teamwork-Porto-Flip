define(['game'], function (game) {
    var shampoo = {
        init: function (x, y, group) {
            shampoo.graphics = group.create(x, y, 'shampoo');
        }
    };

    return shampoo;
});
