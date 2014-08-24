ConWo.Scenes.Game = function (game) {

	var self = this;

	this.game = game;
	this.emitters = {};
	this.music = {};
	this.music.tracks = {};
	this.sounds = {};
}

ConWo.Scenes.Game.prototype = {

	preload: function () {
		this.game.stage.backgroundColor = '#000000';
	},

	setupInput: function () {
		this.keys = {
			'keyQ': this.game.input.keyboard.addKey(Phaser.Keyboard.Q),
			'keyW': this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			'keyA': this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			'keyS': this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			'keyUP': this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
			'keyRIGHT': this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
			'keyDOWN': this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
			'keyLEFT': this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		}
	},

	setupAudio: function() {
		
	},

	setupKeyboardShortcuts: function() {
		var keyK = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
		keyK.onDown.add(ConWo.Helpers.toggleDebugInfo,this);

		ConWo.signals.restartButtonPressed = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
	},

	loadLevel: function() {

		this.yankTex = this.game.add.renderTexture(this.game.world.width/2, this.game.world.height/2, 'rt-yank', true);
		this.arabTex = this.game.add.renderTexture(this.game.world.width/2, this.game.world.height/2, 'rt-arab', true); 
		this.asiaTex = this.game.add.renderTexture(this.game.world.width/2, this.game.world.height/2, 'rt-asia', true); 
		this.peruTex = this.game.add.renderTexture(this.game.world.width/2, this.game.world.height/2, 'rt-peru', true);

		this.yankScreen = this.game.add.sprite(0, 0, this.yankTex, true);
		this.arabScreen = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, this.arabTex, true);
		this.asiaScreen = this.game.add.sprite(0*this.game.world.width/2, this.game.world.height/2, this.asiaTex, true); 
		this.peruScreen = this.game.add.sprite(this.game.world.width/2, 0*this.game.world.height/2, this.peruTex, true);

		this.yankGroup = this.game.add.group(null);
		this.arabGroup = this.game.add.group(null);
		this.asiaGroup = this.game.add.group(null);
		this.peruGroup = this.game.add.group(null);

		this.boxGroup = this.game.add.group();
		this.boxGroup.createMultiple(40, 'spr-box');

		this.yankScreen.filters = [this.game.add.filter('Gray', this.game.width/2, this.game.height/2),this.game.add.filter('Black', this.game.width/2, this.game.height/2)];
		this.arabScreen.filters = [this.game.add.filter('Gray', this.game.width/2, this.game.height/2),this.game.add.filter('Black', this.game.width/2, this.game.height/2)];
		this.asiaScreen.filters = [this.game.add.filter('Gray', this.game.width/2, this.game.height/2),this.game.add.filter('Black', this.game.width/2, this.game.height/2)];
		this.peruScreen.filters = [this.game.add.filter('Gray', this.game.width/2, this.game.height/2),this.game.add.filter('Black', this.game.width/2, this.game.height/2)];

		this.yank = new ConWo.Prefabs.Dude(this.game,this.game.world.width/4+10,this.game.world.height/2-100,'spr-yank');
		this.game.add.sprite(0,0,'spr-yankbg','',this.yankGroup);
		this.yankGroup.add(this.yank);
		
		this.arab = new ConWo.Prefabs.Dude(this.game,this.game.world.width/4+10,this.game.world.height/2-100,'spr-arab');
		this.game.add.sprite(0,0,'spr-arabbg','',this.arabGroup);
		this.arabGroup.add(this.arab);

		this.asia = new ConWo.Prefabs.Dude(this.game,this.game.world.width/4+10,this.game.world.height/2-100,'spr-asia');
		this.game.add.sprite(0,0,'spr-asiabg','',this.asiaGroup);
		this.asiaGroup.add(this.asia);

		this.peru = new ConWo.Prefabs.Dude(this.game,this.game.world.width/4+10,this.game.world.height/2-100,'spr-peru');
		this.game.add.sprite(0,0,'spr-perubg','',this.peruGroup);
		this.peruGroup.add(this.peru);

		var noprod = 0.0;
		var light = 0.05;
		var medium = 0.1;
		var heavy = 0.2;
		var superheavy = 0.4;

		this.yank.consumption = {
			bananas: light,
			vodka: heavy,
			money: medium,
			ent: medium
		};

		this.yank.production = {
			bananas: noprod,
			vodka: light,
			money: heavy,
			ent: heavy
		};

		this.asia.consumption = {
			bananas: light,
			vodka: heavy,
			money: medium,
			ent: light
		};

		this.asia.production = {
			bananas: light,
			vodka: superheavy,
			money: light,
			ent: noprod
		};

		this.peru.consumption = {
			bananas: light,
			vodka: heavy,
			money: light,
			ent: medium
		};

		this.peru.production = {
			bananas: superheavy,
			vodka: light,
			money: noprod,
			ent: light
		};

		this.arab.consumption = {
			bananas: medium,
			vodka: light,
			money: medium,
			ent: heavy
		};

		this.arab.production = {
			bananas: light,
			vodka: noprod,
			money: heavy,
			ent: light
		};

		ConWo.Effects.flash(this.game,1000);
	},

	createUI: function() {
		this.ui = {};
		this.ui.group = this.add.group();

		this.ui.boostKeys = this.add.sprite(this.world.centerX, this.world.centerY, 'spr-boostkeys','',this.ui.group);
		this.ui.boostKeys.anchor.set(0.5);

		this.ui.giveKeys = this.add.sprite(this.world.centerX, this.world.height-20, 'spr-givekeys','',this.ui.group);
		this.ui.giveKeys.anchor.set(0.5,1.0);

		this.ui.timeText = this.add.bitmapText(this.world.centerX,20,'fnt-futu','0',64);
		this.ui.group.add(this.ui.timeText);
	},

	updateTimerText: function(time) {
		this.ui.timeText.text = (this.timerValue/1000).toFixed(2).toString();
		this.ui.timeText.x = this.world.centerX-this.ui.timeText.textWidth/2;
	},

	create: function () {
		this.setupKeyboardShortcuts();
		this.setupInput();
		this.loadLevel();

		this.keys.keyQ.onDown.add(this.yank.boost, this.yank);
		this.keys.keyW.onDown.add(this.peru.boost, this.peru);
		this.keys.keyA.onDown.add(this.asia.boost, this.asia);
		this.keys.keyS.onDown.add(this.arab.boost, this.arab);

		this.keys.keyUP.onDown.add(function() { if(!this.asia.isAliveAndKicking || !this.yank.isAliveAndKicking) return; this.asia.giveTo(this.yank); this.boxFromTo(this.asiaScreen,this.yankScreen); }, this);
		this.keys.keyUP.onDown.add(function() { if(!this.arab.isAliveAndKicking || !this.peru.isAliveAndKicking) return; this.arab.giveTo(this.peru); this.boxFromTo(this.arabScreen,this.peruScreen); }, this);

		this.keys.keyDOWN.onDown.add(function() {if(!this.yank.isAliveAndKicking || !this.asia.isAliveAndKicking) return; this.yank.giveTo(this.asia); this.boxFromTo(this.yankScreen,this.asiaScreen); }, this);
		this.keys.keyDOWN.onDown.add(function() {if(!this.peru.isAliveAndKicking || !this.arab.isAliveAndKicking) return; this.peru.giveTo(this.arab); this.boxFromTo(this.peruScreen,this.arabScreen); }, this);

		this.keys.keyLEFT.onDown.add(function() {if(!this.peru.isAliveAndKicking || !this.yank.isAliveAndKicking) return; this.peru.giveTo(this.yank); this.boxFromTo(this.peruScreen,this.yankScreen); }, this);
		this.keys.keyLEFT.onDown.add(function() {if(!this.arab.isAliveAndKicking || !this.asia.isAliveAndKicking) return; this.arab.giveTo(this.asia); this.boxFromTo(this.arabScreen,this.asiaScreen); }, this);

		this.keys.keyRIGHT.onDown.add(function() {if(!this.yank.isAliveAndKicking || !this.peru.isAliveAndKicking) return; this.yank.giveTo(this.peru); this.boxFromTo(this.yankScreen,this.peruScreen); }, this);
		this.keys.keyRIGHT.onDown.add(function() {if(!this.asia.isAliveAndKicking || !this.arab.isAliveAndKicking) return; this.asia.giveTo(this.arab); this.boxFromTo(this.asiaScreen,this.arabScreen); }, this);

		this.createUI();

		this.startTimer();

		this.updateTimerText(0);
	},

	startTimer: function() {
		this.timerValue = 0;
		this.timerOn = true;
	},

	stopTimer: function() {
		this.timerOn = false;
	},

	render:function() {
		this.yankTex.renderXY(this.yankGroup,0,0,true);
		this.arabTex.renderXY(this.arabGroup,0,0,true);
		this.asiaTex.renderXY(this.asiaGroup,0,0,true);
		this.peruTex.renderXY(this.peruGroup,0,0,true);
	},
	
	update: function() {
		this.yank.update();
		this.arab.update();
		this.asia.update();
		this.peru.update();

		this.yankScreen.filters[0].gray = 1.0-this.yank.health;
		this.arabScreen.filters[0].gray = 1.0-this.arab.health;
		this.asiaScreen.filters[0].gray = 1.0-this.asia.health;
		this.peruScreen.filters[0].gray = 1.0-this.peru.health;

		if(this.timerOn) {
			this.timerValue += this.game.time.elapsed;
			this.updateTimerText();
		}

		if(!this.yank.isAliveAndKicking && !this.arab.isAliveAndKicking && !this.asia.isAliveAndKicking && !this.asia.isAliveAndKicking) {
			this.stopTimer();
			this.startEndSequence();
		}
	},

	startEndSequence: function() {
		//this.game.add.tween(this.ui.timeText.scale).to({x:2.0,y:2.0},1000,Phaser.Easing.Cubic.Out).start();
		//this.game.add.tween(this.ui.timeText).to({x:this.ui.timeText.x-this.ui.timeText.textWidth},1000,Phaser.Easing.Cubic.Out).start();
	},

	boxFromTo: function(from,to) {
		if(this.boxGroup.countDead() > 0 && from && to) {
			var box = this.boxGroup.getFirstDead();
			box.reset(from.x+from.width/2, from.y+from.height/2);
			var moveBox = this.game.add.tween(box).to({x:to.x+to.width/2, y:to.y+to.height/2,angle:380},400,Phaser.Easing.Linear.None);
			moveBox.onComplete.add(function() { box.kill(); },this);
			moveBox.start();
		}
	}
}