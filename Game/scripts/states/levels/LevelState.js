define(['../../game', 'collectableItem'], function (game, CollectableItem) {
    function LevelState(player, controller) {
        this.init(player, controller);
    };

    LevelState.prototype.init = function (player, controller) {
        this.player = player;
        this.controller = controller;
    };

    LevelState.prototype.preload = function () {
    };

    LevelState.prototype.create = function () {
        this.createMap();
        this.initializePlayer();
        this.initializeEngine();
        this.initializeCollectableItems();
    };

    LevelState.prototype.update = function (secondLayerPlatfrom, collection) {
        game.physics.arcade.collide(this.player.graphics, secondLayerPlatfrom);
        game.physics.arcade.overlap(this.player.graphics, collection, this.controller.collectItems, null, this);

        this.controller.update(secondLayerPlatfrom, collection);
    };

    LevelState.prototype.initializeEngine = function () {
        this.controller.pause();
        this.controller.showScore();
    };

    /**
     * To be overridden by derived classes
     *
     * @protected
     */
    LevelState.prototype.createMap = function () {
    };

    /**
     * To be overridden by derived classes
     *
     * @protected
     */
    LevelState.prototype.initializePlayer = function () {
    };

    /**
     * To be overridden by derived classes
     *
     * @protected
     */
    LevelState.prototype.initializeCollectableItems = function () {
    };


    return LevelState;
});

