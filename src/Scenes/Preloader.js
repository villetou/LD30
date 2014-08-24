ConWo.Scenes.Preloader = function (game) {
	this.game = game;
};

ConWo.Scenes.Preloader.prototype = {

	preload: function () {
		this.preloaderBG = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'preloader-bg');

		this.preloaderBG.autoScroll(0,10);

		this.loaderBG = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'loader-bg');
		this.loaderBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'loader-bar');

		this.load.setPreloadSprite(this.loaderBar);

		this.loaderBar.scale.setTo(2,2);

		this.loaderBG.scale.setTo(2);
		this.loaderBar.scale.setTo(2);

		this.loaderBG.anchor.setTo(0.5,0.5);
		this.loaderBar.anchor.setTo(0.5,0.5);

		// Preload stuff
		this.load.image('spr-peru', 'assets/sprites/cowo-assets/Peruvian.png');
		this.load.image('spr-asia', 'assets/sprites/cowo-assets/Asia.png');
		this.load.image('spr-arab', 'assets/sprites/cowo-assets/Arab.png');
		this.load.image('spr-yank', 'assets/sprites/cowo-assets/Lankkari.png');

		this.load.image('spr-perubg', 'assets/sprites/cowo-assets/perubg.png');
		this.load.image('spr-asiabg', 'assets/sprites/cowo-assets/asiabg.png');
		this.load.image('spr-arabbg', 'assets/sprites/cowo-assets/arabbg.png');
		this.load.image('spr-yankbg', 'assets/sprites/cowo-assets/yankbg.png');

		this.load.image('spr-givekeys', 'assets/sprites/cowo-assets/giveKeys.png');
		this.load.image('spr-boostkeys', 'assets/sprites/cowo-assets/boostKeys.png');

		this.load.bitmapFont('fnt-futu','assets/fonts/font.png','assets/fonts/font.fnt');
		
		ConWo.Effects.fadeOutBlack(this);
	},

	create: function () {
		var tween = this.game.add.tween(this.loaderBar).to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.InOut, true);
        tween.onComplete.add(this.startMainMenu, this);
	},

	startMainMenu: function() {
		this.game.state.start('MainMenu');
	}
}