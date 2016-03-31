/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// =============================================
	// Dépendencies
	// =============================================

	var Config  = __webpack_require__( 1 ),
	    Biomes  = __webpack_require__( 2 ),
	    Helpers = __webpack_require__( 4 );


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

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function() {

	    return {
	        seed : 1,
	        chunk : {
	            size  : 100,
	            scale : 5
	        }

	    }

	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	                init : __webpack_require__( 3 )
	            },
	            desert : {
	                color : '#d0f439',
	                weight : 30,
	                objects : {
	                    pyramid : 0.01
	                },
	                init : __webpack_require__( 5 )
	            },
	            hill : {
	                color : '#d2d2e5',
	                weight : 30,
	                if : {
	                    min_altitude : 1
	                },
	                init : __webpack_require__( 10 )
	            },
	            forest : {
	                color : '#8ac801',
	                weight : 40,
	                objects : {
	                    trees : 2,
	                    flowers : 0.1
	                },
	                init : __webpack_require__( 12 )
	            },
	            flower_forest : {
	                color : '#8ac801',
	                weight : 30,
	                objects : {
	                    trees : 1,
	                    flowers : 4
	                },
	                init : __webpack_require__( 12 )
	            },
	            plain : {
	                color : '#8ac801',
	                weight : 101, 
	                objects : {
	                    trees : 0.1
	                },
	                init : __webpack_require__( 12 )
	            }
	        },
	        noise : [],
	    }

	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers = __webpack_require__( 4 ),
	    Config  = __webpack_require__( 1 );


	var Shape = Isomer.Shape;
	var Point = Isomer.Point;
	var Color = Isomer.Color;


	var colors = [
	    '#5361ff',
	    '#4856f2',
	    '#4451ea',
	    '#2e37b0'
	];


	var texture_noise = new Noise( Config.seed * Math.random() ),
	    texture;


	module.exports = function() {

	    return function( iso, name, data, x, y, alt ){

	        var z = alt - 1,
	            c_x = c_y = 1,
	            c_z = 3;

	        texture = Helpers.noise( texture_noise, x, y, 10, colors.length - 1 );
	        color   = Helpers.isoColor( colors[ texture ] );

	        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );
	    }

	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers = __webpack_require__( 4 ),
	    Config  = __webpack_require__( 1 ),
	    Objects = __webpack_require__( 6 );


	var Shape = Isomer.Shape;
	var Point = Isomer.Point;
	var Color = Isomer.Color;

	var texture_noise = new Noise( Config.seed * Math.random() ),
	    texture;

	var colors = [
	    '#cae265',
	    '#d8ed7e',
	    '#d0e674',
	    '#c7db74'
	];


	module.exports = function() {

	    return function( iso, name, data, x, y, z ){

	        var c_x = 1,
	            c_y = 1,
	            c_z = 3;

	        texture = Helpers.noise( texture_noise, x, y, 10, colors.length );
	        color   = Helpers.isoColor( colors[ texture ] );

	        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );

	        if( typeof data.objects === 'object' ) {
	            $.each( data.objects, function( index, value ){
	                Objects[ index ]( iso, x, y, z + c_z, value );
	            } );
	        }
	    }

	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {

	    return {
	        trees : __webpack_require__( 7 ),
	        flowers : __webpack_require__( 8 ),
	        pyramid : __webpack_require__( 9 )
	    }

	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers = __webpack_require__( 4 );


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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers = __webpack_require__( 4 );


	var Shape = Isomer.Shape;
	var Point = Isomer.Point;
	//var Path  = Isomer.Path;
	var Color = Isomer.Color;

	var colors = [
	    '#d1227a'
	];

	module.exports = function() {

	    return function( iso, x, y, z, w ){

	        if( w > Math.random() * 100 ) {
	            var c_x = 1,
	                c_y = 1,
	                c_z = 1;

	            color = Helpers.isoColor( colors[ 0 ] );
	            iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );
	        }

	    }

	}();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers = __webpack_require__( 4 );


	var Shape = Isomer.Shape;
	var Point = Isomer.Point;
	var Color = Isomer.Color;

	var color = Helpers.isoColor( '#a9bc57' );

	module.exports = function() {

	    return function( iso, x, y, z, w ){

	        if( w > Math.random() * 100 ) {
	            var z = z - 1,
	                c_x = c_y = 1,
	                c_z = 1;

	            iso.add( Shape.Prism( new Point( x, y, z + 2 ), 7, 7, 1 ), color );
	            iso.add( Shape.Prism( new Point( x + 1, y + 1, z + 3 ), 5, 5, 1 ), color );
	            iso.add( Shape.Prism( new Point( x + 2, y + 2, z + 4 ), 3, 3, 1 ), color );
	            iso.add( Shape.Prism( new Point( x + 3, y + 3, z + 5 ), 1, 1, 1 ), color );
	        }

	    }

	}();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers = __webpack_require__( 4 ),
	    Config  = __webpack_require__( 1 );

	var Snow = __webpack_require__( 11 );


	var Shape = Isomer.Shape;
	var Point = Isomer.Point;
	var Path  = Isomer.Path;
	var Color = Isomer.Color;


	var texture_noise = new Noise( Config.seed * Math.random() ),
	    texture;

	var colors = [
	    '#d2d2e5',
	    '#c7c7e2',
	    '#cacace'
	];



	module.exports = function() {

	    return function( iso, name, data, x, y, alt ){
	        var z = alt,
	            c_x = c_y = 1,
	            c_z = Math.round( alt * Math.exp( alt / 10 ) ) + 3;

	        texture = Helpers.noise( texture_noise, x, y, 10, colors.length );
	        color   = Helpers.isoColor( colors[ texture ] );

	        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );

	        if( alt === 4 && Math.random() * 10 > 6 ) Snow( iso, x, y, z, c_x, c_y, c_z );
	        if( alt === 5 && Math.random() * 5 > 3 ) Snow( iso, x, y, z, c_x, c_y, c_z );
	        if( alt === 6 && Math.random() * 5 > 1 ) Snow( iso, x, y, z, c_x, c_y, c_z );
	        if( alt > 6 ) Snow( iso, x, y, z, c_x, c_y, c_z );
	    }

	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers = __webpack_require__( 4 );


	var Shape = Isomer.Shape;
	var Point = Isomer.Point;
	//var Path  = Isomer.Path;
	var Color = Isomer.Color;

	var snow = Helpers.isoColor( '#ffffff' );

	module.exports = function() {

	    return function( iso, x, y, z, c_x, c_y, c_z ){

	        iso.add( Shape.Prism( new Point( x, y, z + c_z ), c_x, c_y, 0.1 ), snow );

	    }

	}();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Helpers = __webpack_require__( 4 ),
	    Config  = __webpack_require__( 1 ),
	    Objects = __webpack_require__( 6 );


	var Shape = Isomer.Shape;
	var Point = Isomer.Point;
	var Color = Isomer.Color;

	var texture_noise = new Noise( Config.seed * Math.random() ),
	    texture;

	var colors = [
	    '#8ac801',
	    '#74b803',
	    '#58a000',
	    '#459905'
	];


	module.exports = function() {

	    return function( iso, name, data, x, y, z ){

	        var c_x = 1,
	            c_y = 1,
	            c_z = 3;

	        texture = Helpers.noise( texture_noise, x, y, 10, colors.length );
	        color   = Helpers.isoColor( colors[ texture ] );

	        iso.add( Shape.Prism( new Point( x, y, z ), c_x, c_y, c_z ), color );

	        if( typeof data.objects === 'object' ) {
	            $.each( data.objects, function( index, value ){
	                Objects[ index ]( iso, x, y, z + c_z, value );
	            } );
	        }
	    }

	}();

/***/ }
/******/ ]);