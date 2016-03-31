var Helpers = require( '../helpers' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;


module.exports = function() {

    return function( iso, x, y, z, w ){

        if( w > Math.random() * 100 ) {
            var z = z - 1,
                c_x = c_y = 1,
                c_z = 1;

            iso.add( Shape.Prism( new Point( x, y, z + 2 ), 7, 7, 1 ), new Color( 146, 118, 57 ) );
            iso.add( Shape.Prism( new Point( x + 1, y + 1, z + 3 ), 5, 5, 1 ), new Color( 146, 118, 57 ) );
            iso.add( Shape.Prism( new Point( x + 2, y + 2, z + 4 ), 3, 3, 1 ), new Color( 146, 118, 57 ) );
            iso.add( Shape.Prism( new Point( x + 3, y + 3, z + 5 ), 1, 1, 1 ), new Color( 146, 118, 57 ) );
            //iso.add( Shape.Prism( new Point( x - 1, y - 1, z + 3 ), 3, 3, 2 ), new Color( 28, 84, 0 ) );
        }

    }

}();