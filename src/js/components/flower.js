var Helpers = require( '../helpers' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
//var Path  = Isomer.Path;
var Color = Isomer.Color;


module.exports = function() {

    return function( iso, data, x, y, alt ){

        if( data.weight > Math.random() * 100 ) {
            var z = alt,
                c_x = c_y = 1,
                c_z = 1;

            colorHex = Helpers.hexToRgb( data.color );
            color = new Color( colorHex.r, colorHex.g, colorHex.b );
            iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );
        }

    }

}();