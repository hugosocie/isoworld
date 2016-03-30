var Helpers = require( '../helpers' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
//var Path  = Isomer.Path;
var Color = Isomer.Color;

var snow = Helpers.isoColor( '#ffffff' );

module.exports = function() {

    return function( iso, x, y, z, c_x, c_y, c_z ){

        iso.add( Shape.Prism( new Point( x, y, z + c_z ), c_x, c_y, 0.1 ), snow );

    }

}();