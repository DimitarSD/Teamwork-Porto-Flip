define(['../../game'], function (game) {
    function LevelState(player, engine) {
        this.init(player, engine);
    };

    LevelState.prototype.init = function (player, engine) {
        this.player = player;
        this.engine = engine;
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
        game.physics.arcade.overlap(this.player.graphics, collection, this.engine.collectItems, null, this);

        this.engine.update(secondLayerPlatfrom, collection);
    };

    LevelState.prototype.initializeEngine = function () {
        this.engine.pause();
        this.engine.showScore();
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

