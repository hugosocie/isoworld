var Color = Isomer.Color;


module.exports = function() {

    return {

        hexToRgb : function( hex ){

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
            return result ? {
                r : parseInt( result[ 1 ], 16 ),
                g : parseInt( result[ 2 ], 16 ),
                b : parseInt( result[ 3 ], 16 )
            } : null;

        },

        isoColor : function( hex ){
            var color = this.hexToRgb( hex );
            return new Color( color.r, color.g, color.b );
        },

        noise : function( noise, x, y, coeff, depth ){

            var r = Math.round(
                ( ( noise.simplex2( x / coeff, y / coeff ) + 1 ) / 1.5 )
                * ( depth - 1 ) 
            );

            return ( r > depth - 1 ? depth - 1 : r );
        }

    }

}();