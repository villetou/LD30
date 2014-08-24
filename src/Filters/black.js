/**
* This turns your displayObjects to black. Based on Mat Groves' grayscale filter 8)
* @class Black
* @contructor
*/
Phaser.Filter.Black = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.blackness = { type: '1f', value: 0.0 };
    
    this.fragmentSrc = [

        "precision mediump float;",

        "varying vec2       vTextureCoord;",
        "varying vec4       vColor;",
        "uniform sampler2D  uSampler;",
        "uniform float      blackness;",

        "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "gl_FragColor.rgba = mix(gl_FragColor.rgba, vec4(0.0,0.0,0.0,1.0)*gl_FragColor.a, blackness);",
        "}"
    ];

};

Phaser.Filter.Black.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Black.prototype.constructor = Phaser.Filter.Black;

/**
* The strength of the black. 1 will make the object black and white, 0 will make the object its normal color
* @property black
*/
Object.defineProperty(Phaser.Filter.Black.prototype, 'blackness', {

    get: function() {
        return this.uniforms.blackness.value;
    },

    set: function(value) {
        this.uniforms.blackness.value = value;
    }

});