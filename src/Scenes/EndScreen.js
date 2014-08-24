ConWo.Scenes.EndScreen = function (game) {
	this.game = game;
};

ConWo.Scenes.EndScreen.prototype = {

	init: function(time) {
		this.survived = time || "??";
	},

	preload: function () {
		this.game.stage.backgroundColor = '#c73d5c';
	},

	create: function () {

		this.menu = {};
		this.menu.background = this.game.add.tileSprite(0,0,this.game.world.width, this.game.world.height,'');

		this.menu.background.inputEnabled = true;

		this.menu.background.events.onInputDown.add(this.transitionToState,this);

		var titleText = this.game.add.bitmapText(this.game.world.centerX-8,-128,'fnt-futu',"You survived",128);
		titleText.x -= titleText.textWidth/2;

		var startText = this.game.add.bitmapText(this.game.world.centerX,this.game.world.height,'fnt-futu', this.survived + " seconds",64);
		startText.x -= startText.textWidth/2;

		var clickToPlay = this.game.add.bitmapText(this.game.world.centerX,this.game.world.centerY+titleText.textHeight+20,'fnt-futu', "Click to try again.",64);
		clickToPlay.x -= clickToPlay.textWidth/2;

		var bounceInStart = this.game.add.tween(startText).to({y:this.game.world.centerY},2800,Phaser.Easing.Bounce.Out).start();

		var startUpDownAnim = this.game.add.tween(startText).to({y:this.game.world.centerY+10},1000,Phaser.Easing.Cubic.InOut);
		startUpDownAnim.yoyo(true);
		startUpDownAnim.repeat(20);

		bounceInStart.onComplete.add(function(){startUpDownAnim.start()},this);

		var bounceInTitle = this.game.add.tween(titleText).to({y:this.game.world.centerY-titleText.textHeight},2800,Phaser.Easing.Bounce.Out).start();

		var fadeIn = this.game.add.tween(clickToPlay).to({opacity:1},2800,Phaser.Easing.Cubic.Out).start();

		ConWo.Effects.fadeOutWhite(this,{fromWhite:true});

		this.music = this.game.add.audio('sfx-music-end',0.4);
		this.music.play();

		this.startText = startText;
		this.titleText = titleText;
	},

	transitionToState: function(state) {
		var moveLeft = this.game.add.tween(this.titleText).to({x:-this.titleText.textWidth-20},1000,Phaser.Easing.Cubic.In).start();
		var moveRight = this.game.add.tween(this.startText).to({x:this.game.world.width+20},1000,Phaser.Easing.Cubic.In).start();

		moveLeft.onComplete.add(this.startGame, this, state);
	},

	shutdown: function() {
		this.music.stop();
	},

	startGame: function() {
		this.game.state.start('Game')
	}
}