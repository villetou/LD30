ConWo.Scenes.MainMenu = function (game) {
	this.game = game;
};

ConWo.Scenes.MainMenu.prototype = {

	preload: function () {
		this.game.stage.backgroundColor = '#c73d5c';
	},

	create: function () {

		var keyF = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyF.onDown.add(ConWo.gofull,this);

		this.menu = {};
		this.menu.background = this.game.add.tileSprite(0,0,this.game.world.width, this.game.world.height,'');

		this.menu.background.inputEnabled = true;

		this.menu.background.events.onInputDown.add(this.transitionToState,this);

		var fForFullScreen = this.game.add.bitmapText(0,0,'fnt-futu',"Press F for full screen!",48);
		var fForFullScreen = this.game.add.bitmapText(0,40,'fnt-futu',"Try it at villetou.github.io/LD30/",48);

		var titleText = this.game.add.bitmapText(this.game.world.centerX-8,-128,'fnt-futu',"Connected Nations",128);
		titleText.x -= titleText.textWidth/2;

		var startText = this.game.add.bitmapText(this.game.world.centerX,this.game.world.height,'fnt-futu',"Click to Start",64);
		startText.x -= startText.textWidth/2;

		var bounceInStart = this.game.add.tween(startText).to({y:this.game.world.centerY},2800,Phaser.Easing.Bounce.Out).start();

		var startUpDownAnim = this.game.add.tween(startText).to({y:this.game.world.centerY+10},1000,Phaser.Easing.Cubic.InOut);
		startUpDownAnim.yoyo(true);
		startUpDownAnim.repeat(20);

		bounceInStart.onComplete.add(function(){startUpDownAnim.start()},this);

		var bounceInTitle = this.game.add.tween(titleText).to({y:this.game.world.centerY-titleText.textHeight},2800,Phaser.Easing.Bounce.Out).start();

		ConWo.Effects.fadeOutWhite(this,{fromWhite:true});

		this.startText = startText;
		this.titleText = titleText;


		ConWo.gofull

		this.music = this.game.add.audio('sfx-music-begin',0.4,true);
		this.music.play();
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