//
// Watch task
// ==========================================================================

module.exports = function( gulp, plugins, paths, files ) {

    return function(){

        plugins.browserSync.init({
            port: 1337,
            open: false,
            server: {
                baseDir: "./"
            }
        });

        gulp.watch( files.html,    plugins.browserSync.reload );
        gulp.watch( files.images,  [ 'images', plugins.browserSync.reload ] );
        gulp.watch( files.fonts,   [ 'fonts', plugins.browserSync.reload ] );
        gulp.watch( files.scripts, [ 'scripts', plugins.browserSync.reload ] );
        gulp.watch( files.styles,  [ 'styles' ] );
        gulp.watch( files.svg,     [ 'build', plugins.browserSync.reload ] );
    };

};