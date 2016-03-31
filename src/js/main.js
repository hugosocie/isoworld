// =============================================
// Dépendencies
// =============================================

var Config  = require( './config' ),
    Biomes  = require( './biomes/config' ),
    Helpers = require( './helpers' );


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;


// =============================================
// Canvas
// =============================================

var canvas = document.getElementById( 'canvas' ),
    ctx    = canvas.getContext( '2d' );



// =============================================
// Constants
// =============================================

var iso = null,
    alt = null,
    noise = new Object();


app = {

    init : function(){
        var $win = $( window );
        canvas.width = $win.width();
        canvas.height = $win.height();

        iso = new Isomer( canvas );
        iso.scale = Config.chunk.scale;
        iso.originY = ( canvas.height / 2 ) + ( Config.chunk.size * iso.scale * iso.angle ) + 30;
        iso.colorDifference = 0.12;

        Config.seed = Math.random();

        $.each( Biomes.data, function( index, value ) {
            this.noise = new Noise( Config.seed * Math.random() );
            this.state = false;
            noise[ index ] = null;
        } );

        noise.altitude = new Noise( Config.seed * Math.random() );

        app.draw( 0, 0 );

    },

    draw : function( offset_x, offset_y, callback ) {
        for( var x = Config.chunk.size - 1 - offset_x; x >= 0 - offset_x; x-- ) {
            for( var y = Config.chunk.size - 1 - offset_y; y >= 0 - offset_y; y-- ) {

                alt = Math.round(
                    noise.altitude.simplex2(
                        x / 40, 
                        y / 40
                    ) * 5 ) + 3;

                $.each( Biomes.data, function( index, _this ) {
                    noise[ index ] = _this.noise.simplex2( x / Biomes.size, y / Biomes.size );
                    _this.state = Math.round( ( noise[ index ] + 1 ) * ( Biomes.coeff / 2 ) ) < _this.weight;

                    if( typeof _this.if === 'object' && _this.state ) {

                        if( typeof _this.if.max_altitude !== 'undefined' && alt > _this.if.max_altitude ) {
                            _this.state = false;
                        }

                        if( typeof _this.if.min_altitude !== 'undefined' && alt < _this.if.min_altitude ) {
                            _this.state = false;
                        }

                    }

                    if( _this.state ) {
                        _this.init( iso, index, _this, x, y, alt );
                        return false;
                    }
                });
            }
        }

        if( typeof callback === 'function' ) {
            callback();
        }
    }

};

app.init();