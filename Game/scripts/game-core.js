(function () {
    var game = (function () {
        var game = new Phaser.Game(800, 400, Phaser.AUTO, ''),
        gameState = function (game) { },
        cursors;

    gameState.prototype.preload = function () {
        this.load.image('diamond', 'assets/diamond.png');
        this.load.image('firstaid', 'assets/firstaid.png');
    };

    gameState.prototype.create = function () {
        this.stage.backgroundColor = '#038FD6';
        this.world.setBounds(0, 0, 6000, 400);

        for (var i = 0; i < 100; i += 1) {
            if (i % 10 === 0) {
                this.add.sprite(this.world.randomX, this.world.randomY, 'firstaid');
            } else {
                this.add.sprite(this.world.randomX, this.world.randomY, 'diamond');
            }
        }

        cursors = this.input.keyboard.createCursorKeys();
    };

    gameState.prototype.update = function () {
        if (cursors.up.isDown) {
            this.camera.y -= 4;
        } else if (cursors.down.isDown) {
            this.camera.y += 4;
        }

        if (cursors.left.isDown) {
            this.camera.x -= 4;
        } else if (cursors.right.isDown) {
            this.camera.x += 4;
        }
    };

    game.state.add('game', gameState, true);
     }());
} ());