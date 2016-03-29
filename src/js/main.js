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
var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Path  = Isomer.Path;
var Color = Isomer.Color;



app = {

    init : function(){
        var $win = $( window );
        canvas.width = $win.width();
        canvas.height = $win.height();

        iso = new Isomer( canvas );
        iso.scale = Config.chunk.scale;
        iso.originY = ( canvas.height / 2 ) + ( Config.chunk.size * iso.scale * iso.angle );
        iso.colorDifference = 0.12;

        Config.seed = Math.random();

        var biome_noise = new Noise( Config.seed ),
            altitude_noise = new Noise( Config.seed );

        var _id = 0;
        $.each( Biomes.data, function( index, value ) {
            this.ids = new Array();
            for( var i = 0; i < value.weight; i++ ) {
                this.ids.push( _id + i );
                Biomes.by_id.push( index );
            }
            _id += value.weight;
        } );
        var z, c_x, c_y, c_z, color, colorHex, noise;

        for( var x = Config.chunk.size - 1; x >= 0; x-- ) {
            for( var y = Config.chunk.size - 1; y >= 0; y-- ) {

                c_z = c_x = c_y = 1;
                noise = biome_noise.simplex2( x / Biomes.size, y / Biomes.size );

                var biome_index = Math.round( ( ( noise + 1 ) * ( Biomes.by_id.length - 1 ) ) / 2 );

                //console.log( Math.round( noise ), biome_index );

                var _this = Biomes.data[ Biomes.by_id[ biome_index ] ];

                /*
                var altitude = 
                    Math.round( ( ( altitude_noise.simplex2(
                        x / 30, 
                        y / 30
                    ) * 4 ) ) );
                */
                var altitude = 1;

                if( Biomes.by_id[ biome_index ] === 'hill' ) {
                    var _temp = ( ( noise + 1 ) * ( Biomes.by_id.length - 1 ) ) / 2;
                    console.log( _temp - biome_index );
                }

                //console.log( Biomes.by_id[ biome_index ] );
                //console.log( _this.altitude.min, _this.altitude.max, _this.altitude.max - _this.altitude.min );
                //console.log( altitude );
                //console.log( '---' );

                //console.log( biome_index, Biomes.by_id[ biome_index ] );

                colorHex = Helpers.hexToRgb( _this.color );
                color = new Color( colorHex.r, colorHex.g, colorHex.b )

                z = altitude;


                iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );

                /*
                ctx.save();

                var z = Math.round(
                    noise.simplex2(
                        x / chunck.strenght, 
                        y / chunck.strenght
                    ) * ( chunck.deep / 2 ) ) + 1;

                var c_x = 1,
                    c_y = 1,
                    c_z = 1;

                var c = Math.round(
                    noise2.simplex2(
                        x / 10, 
                        y / 10
                    ) * ( colors.grass.length / 2 )
                ) + ( colors.grass.length / 2 );

                var color = colors.grass[ c ];

                if( z < -1 ) {
                    color = colors.sand;
                }

                if( z < -2 ) {
                    color = colors.deepWater;
                }

                if( z > 4 ) {
                    c = Math.round(
                        noise2.simplex2( x / 20,  y / 20 ) + 1
                    );
                    console.log( c );
                    color = colors.stone[ c ];
                }

                if( z > 7 ) {
                    color = colors.snow
                }

                iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );

                if( ( c == 2 || c == 4 ) && z > -1 && z < 4 ) {
                    iso.add( Shape.Prism( new Point( x, y, z + 1 ), c_x, c_y, c_z ), colors.flower );
                }

                if( ( c == 3 || c == 4 ) && z > -1 && z < 4 && Math.round( Math.random() * 4 ) === 0 ) {
                    iso.add( Shape.Prism( new Point( x, y, z + 1 ), c_x, c_y, 2 ), new Color( 146, 118, 57 ) );
                    iso.add( Shape.Prism( new Point( x - 1, y - 1, z + 3 ), 3, 3, 2 ), new Color( 28, 84, 0 ) );
                }

                ctx.restore();
                */
            }
        }
    }

};

app.init();