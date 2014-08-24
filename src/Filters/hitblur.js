/**
* A horizontal blur filter by Mat Groves http://matgroves.com/ @Doormat23
*/
Phaser.Filter.BlurX = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.blur = { type: '1f', value: 1/1028 };
        
    this.fragmentSrc = [

      "precision mediump float;",

        "varying vec2       vTextureCoord;",
        "varying vec4       vColor;",
        "uniform sampler2D  uSampler;",
        "uniform float blur;",

        "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x - blur,vTextureCoord.y))*0.25 + texture2D(uSampler, vec2(vTextureCoord.x + blur,vTextureCoord.y))*0.25 + texture2D(uSampler, vTextureCoord)*0.50;",
        "}"
    ];

};

Phaser.Filter.BlurX.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.BlurX.prototype.constructor = Phaser.Filter.BlurX;

Object.defineProperty(Phaser.Filter.BlurX.prototype, 'blur', {

    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },

    set: function(value) {
        this.uniforms.blur.value = (1/7000) * value;
    }

});