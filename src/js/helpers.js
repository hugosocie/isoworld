module.exports = function() {

    return {

        ajax : function( url, callback ) {
            $.get( url, function( data ){
                callback( null, data );
            }).fail( function( err ) {
                callback( err, null );
            });
        }

    }

}();