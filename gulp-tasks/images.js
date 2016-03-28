//
// Images task
// ==========================================================================

module.exports = function( gulp, plugins, paths, files ) {

    return function(){
        gulp.src( files.images )
            .pipe( gulp.dest( paths.dist + '/img/' ) );
    };

};