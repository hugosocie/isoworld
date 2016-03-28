//
// Import main depdendencies
// ==========================================================================

var gulp            = require( 'gulp' ),
    gulpLoadPlugins = require( 'gulp-load-plugins' );



//
// Import all depdendencies with "gulpLoadPlugins"
// You need to update "pattern" for all dependencies
// that are not prefixed with "gulp-" or "gulp."
// ==========================================================================

var plugins = gulpLoadPlugins({
    pattern: [
        'gulp-*', 'gulp.*',
        'webpack-stream',
        'browser-sync',
        'main-bower-files',
        'del'
    ]
});


//
// Define folders path
// ==========================================================================

var paths = {
    dist : 'dist',
    src  : 'src'
};



//
// Define files path and files extensions
// ==========================================================================

var files = {
    fonts   : [ paths.src + '/fonts/**/*.{eot,svg,ttf,woff,woff2}' ],
    html    : [ '**/*.html' ],
    images  : [ paths.src + '/img/**/*.{jpg,png,gif,svg}' ],
    scripts : [ paths.src + '/js/**/*.js' ],
    styles  : [ paths.src + '/sass/**/*.scss' ],
    svg     : [ paths.src + '/svg/**/*.svg' ]
};



//
// Define all tasks names
// Tasks name must be the same that the task file name in "gulp-tasks" folder
// ==========================================================================

var tasks = [
    'bower',
    'clean',
    'fonts',
    'iconfont',
    'images',
    'scripts',
    'styles',
    'watch'
];



//
// Load tasks
// ==========================================================================

var loadTasks = function(){
    for( var i = 0; i < tasks.length; i++ ) {
        var name = tasks[ i ],
            path = './gulp-tasks/' + name;
        gulp.task( name, require( path )( gulp, plugins, paths, files ) );
    }
}();



//
// Build task
// ==========================================================================

gulp.task( 'build', function( e ){
    return plugins.sequence( 'iconfont', [ 'scripts', 'bower', 'styles', 'fonts', 'images' ], e );
});



//
// Default task : watch
// ==========================================================================

gulp.task( 'default', function( e ){
    return plugins.sequence( 'build', 'watch', e );
});