var Helpers = require( '../helpers' )


var Shape = Isomer.Shape;
var Point = Isomer.Point;
//var Path  = Isomer.Path;
var Color = Isomer.Color;


module.exports = function() {

    return function( iso, x, y, z, w ){

        if( w > Math.random() * 100 ) {
            var z = z - 1,
                c_x = c_y = 1,
                c_z = 1;

            iso.add( Shape.Prism( new Point( x, y, z + 1 ), c_x, c_y, 2 ), new Color( 146, 118, 57 ) );
            iso.add( Shape.Prism( new Point( x - 1, y - 1, z + 3 ), 3, 3, 2 ), new Color( 28, 84, 0 ) );
        }

    }

}();