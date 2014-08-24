ConWo.Scenes.Boot = function (game) {
	this.game = game;
};

ConWo.Scenes.Boot.prototype = {
	preload: function () {
		this.load.image('loader-bg', 'assets/sprites/ui/loader-bg.png');
		this.load.image('loader-bar', 'assets/sprites/ui/loader-bar.png');
		this.load.image('preloader-bg', 'assets/sprites/ui/preloader-bg.png');
	},

	create: function () {

		//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		this.stage.disableVisibilityChange = true;
		this.game.stage.smoothed = true;

		this.game.scale.forceLandscape = true;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.refresh();

		// Stretch to fill
    	this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

		// Keep original size
		// game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

		// Maintain aspect ratio
		// game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

		// Setup filters
		ConWo.filters = {};

		ConWo.filters.black = this.game.add.filter('Black', this.game.width, this.game.height);
		ConWo.filters.white = this.game.add.filter('White', this.game.width, this.game.height);

		this.game.stage.filters = [ConWo.filters.black, ConWo.filters.white];

		this.game.state.start('Preloader');
	}
}