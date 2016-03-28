//
// Styles task
// ==========================================================================

module.exports = function( gulp, plugins, paths, files ) {

    var includePaths = [
        require( 'node-reset-scss' ).includePath,
        require( 'bourbon' ).includePaths
    ];

    return function(){
        gulp.src( paths.src + '/sass/main.scss' )
            .pipe( plugins.plumber() )
            .pipe( plugins.sassBulkImport() )
            .pipe( plugins.sass({
                    includePaths: includePaths
                }).on( 'error', plugins.sass.logError ) )
            .pipe( gulp.dest( paths.dist + '/css/' ) )
            .pipe( plugins.browserSync.stream() );
    };

};