module.exports = function() {

    return {
        size : 200,
        coeff : 100,
        data : {
            water : {
                color : '#5361ff',
                weight : 40,
                if : {
                    max_altitude : 0
                },
                init : require( './water.js' )
            },
            desert : {
                color : '#d0f439',
                weight : 30,
                objects : {
                    pyramid : 0.01
                },
                init : require( './desert.js' )
            },
            hill : {
                color : '#d2d2e5',
                weight : 30,
                if : {
                    min_altitude : 1
                },
                init : require( './hill.js' )
            },
            forest : {
                color : '#8ac801',
                weight : 40,
                objects : {
                    trees : 2,
                    flowers : 0.1
                },
                init : require( './default.js' )
            },
            flower_forest : {
                color : '#8ac801',
                weight : 30,
                objects : {
                    trees : 1,
                    flowers : 4
                },
                init : require( './default.js' )
            },
            plain : {
                color : '#8ac801',
                weight : 101, 
                objects : {
                    trees : 0.1
                },
                init : require( './default.js' )
            }
        },
        noise : [],
    }

}();