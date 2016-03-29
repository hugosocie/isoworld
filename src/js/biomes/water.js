var Helpers = require( '../helpers' ),
    Config  = require( '../config' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Path  = Isomer.Path;
var Color = Isomer.Color;

var texture_noise = new Noise( Config.seed * Math.random() ),
    texture;


module.exports = function() {

    return function( iso, name, data, x, y, alt ){

        var z = alt - 2,
            c_x = c_y = 1,
            c_z = 3;

        texture =
            Math.round(
                texture_noise.simplex2(
                    x / 10,
                    y / 10
                ) * ( data.colors.length / 2 )
            ) + data.colors.length / 2;

        colorHex = Helpers.hexToRgb( typeof data.colors[ texture ] !== 'undefined' ? data.colors[ texture ] : data.color );
        color = new Color( colorHex.r, colorHex.g, colorHex.b );

        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );
    }

}();