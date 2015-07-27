define(['game'], function (game) {
    var cookie = {
        init: function (x, y, group) {
            cookie.graphics = group.create(x, y, 'sweet-cookie');
        }
    };

    return cookie;
});
