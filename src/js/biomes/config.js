module.exports = function() {

    return {
        size : 100,
        max_weight : 10,
        data : {
            water : {
                color : '#5361ff',
                colors : [
                    '#5361ff',
                    '#4856f2',
                    '#4451ea',
                    '#2e37b0'
                ],
                weight : 2,
                init : require( './water.js' )
            },
            hill : {
                color : '#d2d2e5',
                weight : 3,
                init : require( './hill.js' )
            },
            forest : {
                color : '#8ac801',
                colors : [
                    '#8ac801',
                    '#74b803',
                    '#58a000',
                    '#459905'
                ],
                flowers : {
                    weight : 0.5,
                    color : '#fffef4'
                },
                trees : {
                    weight : 2
                },
                weight : 4,
                init : require( './forest.js' )
            },
            flower_forest : {
                color : '#8ac801',
                colors : [
                    '#8ac801',
                    '#74b803',
                    '#58a000',
                    '#459905'
                ],
                flowers : {
                    weight : 4,
                    color : '#d1227a'
                },
                trees : {
                    weight : 1
                },
                weight : 3,
                init : require( './forest.js' )
            },
            plain : {
                color : '#8ac801',
                colors : [
                    '#8ac801',
                    '#74b803',
                    '#58a000',
                    '#459905'
                ],
                trees : {
                    weight : 0.1
                },
                weight : 100,
                init : require( './plain.js' )
            }
        },
        noise : [],
        by_id : []
    }

}();