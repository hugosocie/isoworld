var Helpers = require( '../helpers' ),
    Config  = require( '../config' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;


var colors = [
    '#5361ff',
    '#4856f2',
    '#4451ea',
    '#2e37b0'
];


var texture_noise = new Noise( Config.seed * Math.random() ),
    texture;


module.exports = function() {

    return function( iso, name, data, x, y, alt ){

        var z = alt - 1,
            c_x = c_y = 1,
            c_z = 3;

        texture = Helpers.noise( texture_noise, x, y, 10, colors.length - 1 );
        color   = Helpers.isoColor( colors[ texture ] );

        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );
    }

}();