define(function () {
    function CollectableItem(x, y, group, type) {
        this.init(x, y, group, type);
    };

    CollectableItem.prototype.init = function (x, y, group, type) {
        this.graphics = group.create(x, y, type);
    };

    return CollectableItem;
});
