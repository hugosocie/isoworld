//
// Iconfont task
// Transform svg files from '/src/svg' to fonts
// and generate associated scss files
// ==========================================================================

module.exports = function( gulp, plugins, paths, files ) {

    return function(){

        var opts = {
            name  : 'icon',
            class : 'icon',
            path  : 'fonts/icon'
        };

        var runTimestamp = Math.round( Date.now() / 1000 );

        gulp.src( files.svg )
            .pipe( gulp.dest( paths.dist + '/svg/' ) )
            .pipe( plugins.iconfont({
                fontName           : opts.name,
                prependUnicode     : false,
                formats            : [ 'ttf', 'eot', 'woff', 'svg', 'woff2' ], 
                timestamp          : runTimestamp,
                centerHorizontally : true,
            }))
            .on( 'glyphs', function( glyphs, options ) {
                gulp.src( paths.src + '/_tpl/_icons.scss' )
                    .pipe( plugins.consolidate( 'lodash', {
                        glyphs    : glyphs,
                        fontName  : opts.name,
                        fontPath  : opts.path,
                        className : opts.class
                    }))
                    .pipe( gulp.dest( paths.src + '/sass/_build' ) );
            } )
            .pipe( gulp.dest( paths.dist + '/fonts/' + opts.name ) );
    };

};