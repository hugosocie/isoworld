var Helpers = require( '../helpers' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Path  = Isomer.Path;
var Color = Isomer.Color;


module.exports = function() {

    return function( iso, name, data, x, y, alt ){
        var z = alt,
            c_x = c_y = 1,
            c_z = Math.round( alt * Math.exp( alt / 6 ) );

        colorHex = Helpers.hexToRgb( data.color );
        color = new Color( colorHex.r, colorHex.g, colorHex.b );
        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );
    }

}();