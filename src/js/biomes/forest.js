var Helpers = require( '../helpers' ),
    Config  = require( '../config' );

var Flower  = require( '../components/flower' ),
    Tree  = require( '../components/tree' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Path  = Isomer.Path;
var Color = Isomer.Color;

var texture_noise = new Noise( Config.seed * Math.random() ),
    texture;


module.exports = function() {

    return function( iso, name, data, x, y, alt ){

        var z = alt,
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

        if( typeof data.flowers !== 'undefined' ) {
            Flower( iso, data.flowers, x, y, z + c_z );
        }

        if( typeof data.trees !== 'undefined' ) {
            Tree( iso, data.trees, x, y, z + c_z );
        }
    }

}();