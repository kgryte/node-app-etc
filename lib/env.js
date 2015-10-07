'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ),
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
	var keys,
		obj,
		out,
		len,
		key,
		val,
		i;

	obj = load( dir, basename );
	if ( obj === null ) {
		return null;
	}
	keys = Object.keys( obj );
	len = keys.length;
	out = {};
	for ( i = 0; i < len; i++ ) {
		key = obj[ keys[ i ] ];
		val = process.env[ keys[ i ] ];
		if ( val !== void 0 ) {
			deepSet( out, key, val, {
				'create': true,
				'sep': '.'
			});
		}
	}
	return out;
} // end FUNCTION env()


// EXPORTS //

module.exports = env;
