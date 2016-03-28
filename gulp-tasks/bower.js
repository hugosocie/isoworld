//
// Bower task
// Import all Javascript dependencies from bower_components
// ==========================================================================


module.exports = function( gulp, plugins, paths ) {

    return function(){
        gulp.src( plugins.mainBowerFiles({
                includeDev : true
            }) )
            .pipe( plugins.filter( '*.js' ) )
            .pipe( plugins.concat( 'libs.js' ) )
            .pipe( plugins.uglify() )
            .pipe( gulp.dest( paths.dist + '/js/' ) );
    };

};