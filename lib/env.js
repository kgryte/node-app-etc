'use strict';

// MODULES //

var env2obj = require( 'env-to-object' ),
	load = require( './load.js' );


// ENVIRONMENT VARIABLES //

/**
* FUNCTION: env( dir, basename )
*	Creates a configuration object from environment variables.
*
* @param {String} dir - configuration directory
* @param {String} basename - basename of file containing environment variable mappings
* @returns {Object|Null} configuration object or null
*/
function env( dir, basename ) {
	var map = load( dir, basename );
	if ( map === null ) {
		return null;
	}
	return env2obj( map );
} // end FUNCTION env()


// EXPORTS //

module.exports = env;
