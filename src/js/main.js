// =============================================
// Dépendencies
// =============================================

var Config  = require( './config' ),
    Biomes  = require( './biomes/config' ),
    Helpers = require( './helpers' );



// =============================================
// Canvas
// =============================================

var canvas = document.getElementById( 'canvas' ),
    ctx    = canvas.getContext( '2d' );



// =============================================
// Isomer
// =============================================

var iso = null;
//var Shape = Isomer.Shape;
//var Point = Isomer.Point;
//var Path  = Isomer.Path;
//var Color = Isomer.Color;



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

        var noise = new Object();
        $.each( Biomes.data, function( index, value ) {
            this.noise = new Noise( Config.seed * Math.random() );
            this.state = false;
            noise[ index ] = null;
        } );

        noise.altitude = new Noise( Config.seed * Math.random() );

        var alt;

        for( var x = Config.chunk.size - 1; x >= 0; x-- ) {
            for( var y = Config.chunk.size - 1; y >= 0; y-- ) {

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
    }

};

app.init();