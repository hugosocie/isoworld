var Helpers = require( '../helpers' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
//var Path  = Isomer.Path;
var Color = Isomer.Color;

var colors = [
    '#d1227a'
];

module.exports = function() {

    return function( iso, x, y, z, w ){

        if( w > Math.random() * 100 ) {
            var c_x = 1,
                c_y = 1,
                c_z = 1;

            color = Helpers.isoColor( colors[ 0 ] );
            iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );
        }

    }

}();