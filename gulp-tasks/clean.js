//
// Clean task
// ==========================================================================

module.exports = function( gulp, plugins, paths ) {

    return function(){
        plugins.del( [
            paths.dist,
            paths.src + '/sass/_build'
        ] );
    };

};