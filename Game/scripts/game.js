define(function () {
    var game;

    try{
        game = new Phaser.Game(1000, 500, Phaser.CANVAS);
    }
    catch(ex){
        alert("Your browser does not support Phaser. Please upgrade.");
    }

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    game.findObjectsByType = function (type, map, layer) {
        var result = new Array();

        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                element.y -= map.tileHeight;
                result.push(element);
            }
        });

        return result;
    };

    //create a sprite from an object
    game.createFromTiledObject = function (element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    };

    return game;
});
