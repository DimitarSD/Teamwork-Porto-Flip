define(['game'], function (game) {
    var pause_label,
        scoreText,
        cursors;

    function Engine(player) {
        this.player = player;
    };

    Engine.prototype.pause = function () {
        pause_label = game.add.text(900, 30, 'Pause', {font: '24px Arial', fill: 'white'});
        pause_label.fixedToCamera = true;
        pause_label.inputEnabled = true;

        pause_label.events.onInputUp.add(function () {
            game.paused = true;

            pause_label.x -= 80;
            pause_label.text = 'Back to game';
        });

        game.input.onDown.add(this.unpause, self);
    };

    Engine.prototype.unpause = function () {
        if (game.paused) {
            // TODO: Check if the click was on the 'Back to game'
            //if (event.x && event.y) {
            game.paused = false;

            pause_label.x += 80;
            pause_label.text = 'Pause';
            //}
        }
    };

    Engine.prototype.showScore = function () {
        scoreText = game.add.text(16, 30, 'Score: ' + this.player.points, {font: '32px Arial', fill: 'white'});
        scoreText.fixedToCamera = true;
    };

    Engine.prototype.collectItems = function (playerSprite, snitch) {
        snitch.kill();

        this.player.increasePoints();
        scoreText.text = 'Score: ' + this.player.points;
    };

    Engine.prototype.meetFriend = function () {
        this.player.increasePoints().increasePoints().increasePoints();
        scoreText.text = 'Score: ' + this.player.points;
    };

    Engine.prototype.update = function () {
        this.player.graphics.body.velocity.x = 0;
        cursors = game.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            // Move to the left
            this.player.move('left');
        }
        else if (cursors.right.isDown) {
            // Move to the right
            this.player.move('right');
        }
        else {
            // Stand still
            this.player.stayStill();
        }

        // Allow the player to jump if they are touching the ground
        if (cursors.up.isDown && this.player.graphics.body.onFloor()) {
            this.player.jump();
        }

        if (this.player.graphics.y === 464) {
            this.player.kill();
        }
    };

    return Engine;
});
