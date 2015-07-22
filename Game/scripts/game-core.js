var game = (function () {
	var game = Object.create({}),
		cursors;

	Object.defineProperties(game, {
		init: function () {
			this.game = new Phaser.Game(800, 100, Phaser.Canvas, '', {
				preload: this.preload,
				create: this.create,
				update: this.update
			});
		},
		preload: function () {
			this.game.load.image('diamond', 'assets/diamond.png');
			this.game.load.image('firstaid', 'assets/firstaid.png');
		},
		create: function () {
			var positionX = this.game.world.randomX,
				positionY = this.game.world.randomY;
					
			this.game.stage.backgroundColor = '#009800';
			this.game.world.setBounds(0, 0, 6000, 400);

			for (var i = 0; i < 100; i += 1) {
				if (i % 10 === 0) {
					this.game.add.sprite(positionX, positionY, 'firstaid');
				} else {
					this.game.add.sprite(positionX, positionY, 'diamond');
				}
			}
			
			cursors = this.game.input.keyboard.createCursorKeys();
		},
		update: function () {
			if (cursors.up.isDown) {
				this.game.camera.y -= 4;
			} else if (cursors.down.isDown) {
				this.game.camera.y += 4;
			}
			
			if (cursors.left.isDown) {
				this.game.camera.x -= 4;
			} else {
				this.game.camera.x += 4;
			}
		}
	});

	return {
		preload: this.preload,
		create: this.create,
		update: this.update
	};
} ());

