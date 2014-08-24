/**
* This turns your displayObjects to black. Based on Mat Groves' grayscale filter 8)
* @class White
* @contructor
*/
Phaser.Filter.White = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.whiteness = { type: '1f', value: 0.0 };
    
    this.fragmentSrc = [

        "precision mediump float;",

        "varying vec2       vTextureCoord;",
        "varying vec4       vColor;",
        "uniform sampler2D  uSampler;",
        "uniform float      whiteness;",

        "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "gl_FragColor.rgba = mix(gl_FragColor.rgba, vec4(1.0)*gl_FragColor.a, whiteness);",
        "}"
    ];

};

Phaser.Filter.White.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.White.prototype.constructor = Phaser.Filter.White;

/**
* The strength of the black. 1 will make the object black and white, 0 will make the object its normal color
* @property black
*/
Object.defineProperty(Phaser.Filter.White.prototype, 'whiteness', {

    get: function() {
        return this.uniforms.whiteness.value;
    },

    set: function(value) {
        this.uniforms.whiteness.value = value;
    }

});