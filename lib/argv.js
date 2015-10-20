'use strict';

// MODULES //

var argv2obj = require( 'argv-to-object' ),
	load = require( './load.js' );


// COMMAND-LINE ARGUMENTS //

/**
* FUNCTION: argv( dir, basename )
*	Creates a configuration object from command-line arguments.
*
* @param {String} dir - configuration directory
* @param {String} basename - basename of file containing command-line argument mappings
* @returns {Object|Null} configuration object or null
*/
function argv( dir, basename ) {
	var map = load( dir, basename );
	if ( map === null ) {
		return null;
	}
	return argv2obj( map );
} // end FUNCTION argv()


// EXPORTS //

module.exports = argv;
