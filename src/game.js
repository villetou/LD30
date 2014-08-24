var ConWo = ConWo || {};
ConWo.game = ConWo.game || {};
ConWo.Scenes = ConWo.Scenes || {};
ConWo.Prefabs = ConWo.Prefabs || {};
ConWo.Utils = ConWo.Utils || {};

ConWo.blendModes = {
    NORMAL:0,
    ADD:1,
    MULTIPLY:2,
    SCREEN:3,
    OVERLAY:4,
    DARKEN:5,
    LIGHTEN:6,
    COLOR_DODGE:7,
    COLOR_BURN:8,
    HARD_LIGHT:9,
    SOFT_LIGHT:10,
    DIFFERENCE:11,
    EXCLUSION:12,
    HUE:13,
    SATURATION:14,
    COLOR:15,
    LUMINOSITY:16
};

ConWo.signals = ConWo.signals || {};

ConWo.Settings = {
	musicVolume: 0.3,
	musicFadeoutFactor: 0.5,
	debug:false
}

function startUp() {

	var width = 1280,
        height = 800,
        renderer = Phaser.AUTO;

	ConWo.game = new Phaser.Game(width, height, renderer, null, null);

	ConWo.game.state.add("Boot", ConWo.Scenes.Boot);
	ConWo.game.state.add("Preloader", ConWo.Scenes.Preloader);
	ConWo.game.state.add("MainMenu", ConWo.Scenes.MainMenu);
	ConWo.game.state.add("Game", ConWo.Scenes.Game);

    ConWo.game.state.start("Boot");
}

window.onload = startUp;

function goFullScreen() {
    ConWo.game.scale.startFullScreen(false);
}

ConWo.Helpers = {};
ConWo.Helpers.toggleDebugInfo = function() {
	ConWo.Settings.debug = !ConWo.Settings.debug;
	console.log('debug' + ConWo.Settings.debug);
}

ConWo.Effects = {};
ConWo.Effects.fadeInBlack = function(game,settings) {

	settings = settings || {speed:1000,fromClear:false};
	if(isNaN(settings.speed)) settings.speed = 1000;
	if(settings.fromClear != true) settings.fromClear = false;

	if(settings.fromClear == true) {
		ConWo.filters.black.blackness = 0;
	}

	var fadeIn = game.add.tween(ConWo.filters.black).to({blackness:1},settings.speed).start();
}

ConWo.Effects.fadeOutBlack = function(game,settings) {

	settings = settings || {speed:1000,fromBlack:false};
	if(isNaN(settings.speed)) settings.speed = 1000;
	if(settings.fromBlack != true) settings.fromBlack = false;

	if(settings.fromBlack == true) {
		ConWo.filters.black.blackness = 1;
	}


	var fadeOut = game.add.tween(ConWo.filters.black).to({blackness:0},1000).start();
}

ConWo.Effects.fadeInWhite = function(game,settings) {

	settings = settings || {speed:1000,fromClear:false};
	if(isNaN(settings.speed)) settings.speed = 1000;
	if(settings.fromClear != true) settings.fromClear = false;

	if(settings.fromClear == true) {
		ConWo.filters.white.whiteness = 0;
	}

	var fadeIn = game.add.tween(ConWo.filters.white).to({whiteness:1},settings.speed).start();
}

ConWo.Effects.fadeOutWhite = function(game,settings) {

	settings = settings || {speed:1000,fromWhite:false};
	if(isNaN(settings.speed)) settings.speed = 1000;
	if(settings.fromWhite != true) settings.fromWhite = false;

	if(settings.fromWhite == true) {
		ConWo.filters.white.whiteness = 1;
	}

	var fadeOut = game.add.tween(ConWo.filters.white).to({whiteness:0},1000).start();
}

ConWo.Effects.flash = function(game,speed) {

	speed = speed || 500;

	ConWo.filters.white.whiteness = 1.0;

	var whiteOut = game.add.tween(ConWo.filters.white).to({whiteness:0},speed).start();
}