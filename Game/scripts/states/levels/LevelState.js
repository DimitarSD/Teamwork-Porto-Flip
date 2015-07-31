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

    LevelState.prototype.update = function (secondLayerPlatform, collection) {
        game.physics.arcade.collide(this.player.graphics, secondLayerPlatform);
        game.physics.arcade.overlap(this.player.graphics, collection, this.engine.collectItems, null, this);

        this.engine.update(secondLayerPlatform, collection);
    };

    LevelState.prototype.initializeEngine = function () {
        this.engine.pause();
        this.engine.showScore();
    };

    LevelState.prototype.initializePlayer = function () {
        this.player.makeBodyArcade();
        this.player.addAnimations();

        // Camera will move with the player
        this.camera.follow(this.player.graphics);
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
    LevelState.prototype.initializeCollectableItems = function () {
    };


    return LevelState;
});

