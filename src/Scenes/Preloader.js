ConWo.Scenes.Preloader = function (game) {
	this.game = game;
};

ConWo.Scenes.Preloader.prototype = {

	preload: function () {
		
		this.game.stage.backgroundColor = '#c73d5c';

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
		
		this.load.image('spr-box', 'assets/sprites/cowo-assets/box.png');

		this.load.image('spr-givekeys', 'assets/sprites/cowo-assets/giveKeys.png');
		this.load.image('spr-boostkeys', 'assets/sprites/cowo-assets/boostKeys.png');

		this.load.bitmapFont('fnt-futu','assets/fonts/font.png','assets/fonts/font.fnt');

		// Sounds
		this.game.load.audio('sfx-music', 'assets/sounds/ld30music.ogg');

		this.game.load.audio('sfx-rus-death', 'assets/sounds/rus_death.ogg');
		this.game.load.audio('sfx-rus-throw', 'assets/sounds/rus_throw.ogg');

		this.game.load.audio('sfx-dude-death', 'assets/sounds/dude_death.ogg');
		this.game.load.audio('sfx-dude-throw', 'assets/sounds/dude_throw.ogg');

		this.game.load.audio('sfx-yank-death', 'assets/sounds/yank_death.ogg');
		this.game.load.audio('sfx-yank-throw', 'assets/sounds/yank_throw.ogg');

		this.game.load.audio('sfx-arab-death', 'assets/sounds/arab_death.ogg');
		this.game.load.audio('sfx-arab-throw', 'assets/sounds/arab_throw.ogg');

		this.game.load.audio('sfx-peru-death', 'assets/sounds/peru_death.ogg');
		this.game.load.audio('sfx-peru-throw', 'assets/sounds/peru_throw.ogg');

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