var Helpers = require( '../helpers' ),
    Config  = require( '../config' );

var Snow = require( '../objects/snow' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Path  = Isomer.Path;
var Color = Isomer.Color;


var texture_noise = new Noise( Config.seed * Math.random() ),
    texture;

var colors = [
    '#d2d2e5',
    '#c7c7e2',
    '#cacace'
];



module.exports = function() {

    return function( iso, name, data, x, y, alt ){
        var z = alt,
            c_x = c_y = 1,
            c_z = Math.round( alt * Math.exp( alt / 10 ) ) + 3;

        texture = Helpers.noise( texture_noise, x, y, 10, colors.length );
        color   = Helpers.isoColor( colors[ texture ] );

        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );

        if( alt === 4 && Math.random() * 10 > 6 ) Snow( iso, x, y, z, c_x, c_y, c_z );
        if( alt === 5 && Math.random() * 5 > 3 ) Snow( iso, x, y, z, c_x, c_y, c_z );
        if( alt === 6 && Math.random() * 5 > 1 ) Snow( iso, x, y, z, c_x, c_y, c_z );
        if( alt > 6 ) Snow( iso, x, y, z, c_x, c_y, c_z );
    }

}();