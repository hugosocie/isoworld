var canvas = document.getElementById( "canvas" ),
    ctx    = canvas.getContext('2d');
var iso = null;

var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Path  = Isomer.Path;
var Color = Isomer.Color;

var brown = new Color( 51, 28, 0 );

var greens = [
    new Color( 138, 200, 1 ),
    new Color( 116, 184, 3 ),
    new Color( 88, 160, 0 ),
    new Color( 69, 153, 5 )
];

var colors = {
    water : new Color( 83, 97, 255 ),
    deepWater : new Color( 46, 55, 176 ),
    sand : new Color( 204, 208, 135 ),
    grass : [
        new Color( 138, 200, 1 ),
        new Color( 138, 200, 1 ),
        new Color( 138, 200, 1 ),
        new Color( 138, 200, 1 ),
        new Color( 138, 200, 1 ),

        new Color( 116, 184, 3 ),
        new Color( 116, 184, 3 ),
        new Color( 116, 184, 3 ),
        new Color( 116, 184, 3 ),
        new Color( 116, 184, 3 ),

        new Color( 88, 160, 0 ),
        new Color( 88, 160, 0 ),
        new Color( 88, 160, 0 ),
        new Color( 88, 160, 0 ),
        new Color( 88, 160, 0 ),

        new Color( 69, 153, 5 ),
        new Color( 69, 153, 5 ),
        new Color( 69, 153, 5 ),
        new Color( 69, 153, 5 ),
        new Color( 69, 153, 5 ),

        new Color( 139, 152, 106 ),
        new Color( 182, 192, 163 ),
        new Color( 232, 243, 193 ),
        new Color( 212, 223, 202 )
    ],
    snow  : new Color( 238, 236, 235 ),
    stone : [
        new Color( 210, 210, 229 ),
        new Color( 200, 196, 215 ),
        new Color( 169, 196, 225 )
    ],
    flower : new Color( 209, 34, 122 )
};

/*
var biomes = {
    plain : {
        color : new Color( 138, 200, 1 )
    },
    hill  : {
        color : new Color( 200, 196, 215 )
    },
    desert : {
        color : new Color( 204, 208, 135 )
    },
    ocean : {
        color : new Color( 46, 55, 176 )
    }
}
*/

var chunck = {
    size  : 100,
    deep  : 11,
    scale : 7,
    strenght : 40
}


app = {

    init : function(){
        var $win = $( window );
        canvas.width = $win.width();
        canvas.height = $win.height();

        iso = new Isomer( canvas );
        console.log( iso );

        iso.scale = chunck.scale;
        iso.originY = ( canvas.height / 2 ) + ( chunck.size * iso.scale * iso.angle );
        iso.colorDifference = 0.12;

        var noise = new Noise( Math.random() ),
            noise2 = new Noise( Math.random() );

        for( var x = chunck.size - 1; x >= 0; x-- ) {
            for( var y = chunck.size - 1; y >= 0; y-- ) {
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
            }
        }
    }

};

app.init();