var Helpers = require( '../helpers' ),
    Config  = require( '../config' ),
    Objects = require( '../objects/config' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;

var texture_noise = new Noise( Config.seed * Math.random() ),
    texture;

var colors = [
    '#8ac801',
    '#74b803',
    '#58a000',
    '#459905'
];


module.exports = function() {

    return function( iso, name, data, x, y, z ){

        var c_x = 1,
            c_y = 1,
            c_z = 3;

        texture = Helpers.noise( texture_noise, x, y, 10, colors.length );
        color   = Helpers.isoColor( colors[ texture ] );

        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );

        if( typeof data.objects === 'object' ) {
            $.each( data.objects, function( index, value ){
                Objects[ index ]( iso, x, y, z + c_z, value );
            } );
        }
    }

}();