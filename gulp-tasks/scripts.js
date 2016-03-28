//
// Scripts task
// ==========================================================================

module.exports = function( gulp, plugins, paths, files ) {

    return function(){
        gulp.src( paths.src + '/js/main.js' )
            .pipe( plugins.plumber() )
            .pipe( plugins.webpackStream({
                output: {
                    filename: 'main.js'
                }
            }) )
            .pipe( gulp.dest( paths.dist + '/js/' ) );
    };

};