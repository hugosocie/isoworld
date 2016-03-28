//
// Fonts task
// ==========================================================================

module.exports = function( gulp, plugins, paths, files ) {

    return function(){
        gulp.src( files.fonts )
            .pipe( gulp.dest( paths.dist + '/fonts/' ) );
    };

};